<template>
  <div>
    <!-- 页面标题 -->
    <div class="text-center mb-12">
      <h1 class="home-title">
        欢迎来到 <span class="text-gradient">LearnLink</span>
      </h1>
      <p class="text-lg text-gray-600 max-w-2xl mx-auto">
        汇集优质前端学习资源，助力你的编程学习之路
      </p>
    </div>
    
    <!-- 快速搜索 -->
    <div class="max-w-2xl mx-auto mb-12">
      <SearchInput
        :value="searchKeyword"
        @input="handleSearchInput"
        @clear="handleSearchClear"
        placeholder="快速搜索学习资源..."
      />
    </div>
    
    <!-- 分类导航 -->
    <CategoryNav
      :categories="categories"
      :selected-category="selectedCategory"
      @category-change="handleCategoryChange"
    />
    
    <!-- 热门推荐 -->
    <div class="mb-8">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-2xl font-bold text-gray-800 flex items-center">
          <span class="mr-2 icon-emoji icon-emoji-sm">🔥</span>
          热门推荐
        </h2>
        <button
          @click="sortBy = sortBy === 'visit' ? 'favorite' : 'visit'"
          class="text-sm text-gray-600 hover:text-primary transition-colors"
        >
          {{ sortBy === 'visit' ? '按收藏数排序' : '按访问量排序' }}
        </button>
      </div>
      
      <!-- 加载状态 -->
      <LoadingSkeleton v-if="loading" :count="6" />
      
      <!-- 网址卡片列表 -->
      <div v-else-if="displayedLinks.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <LinkCard
          v-for="link in displayedLinks"
          :key="link.id"
          :link="link"
          @favorite-changed="handleFavoriteChanged"
        />
      </div>
      
      <!-- 空状态 -->
      <EmptyState
        v-else
        icon="📚"
        title="暂无数据"
        message="没有找到相关的学习资源"
      />
    </div>
    
    <!-- 分页 -->
    <div v-if="totalPages > 1" class="flex justify-center items-center space-x-2 mt-8">
      <button
        @click="currentPage = Math.max(1, currentPage - 1)"
        :disabled="currentPage === 1"
        class="px-4 py-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
      >
        上一页
      </button>
      <span class="px-4 py-2 text-gray-600">
        第 {{ currentPage }} / {{ totalPages }} 页
      </span>
      <button
        @click="currentPage = Math.min(totalPages, currentPage + 1)"
        :disabled="currentPage === totalPages"
        class="px-4 py-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
      >
        下一页
      </button>
    </div>
  </div>
</template>

<script>
import { linksData, categories } from '@/data/links'
import { getVisitCount, getFavorites } from '@/utils/storage'
import { debounce } from '@/utils/helpers'
import LinkCard from '@/components/LinkCard.vue'
import SearchInput from '@/components/SearchInput.vue'
import CategoryNav from '@/components/CategoryNav.vue'
import LoadingSkeleton from '@/components/LoadingSkeleton.vue'
import EmptyState from '@/components/EmptyState.vue'

export default {
  name: 'Home',
  components: {
    LinkCard,
    SearchInput,
    CategoryNav,
    LoadingSkeleton,
    EmptyState
  },
  data() {
    return {
      links: [],
      categories,
      selectedCategory: 'all',
      searchKeyword: '',
      sortBy: 'visit', // 'visit' 或 'favorite'
      currentPage: 1,
      pageSize: 12,
      loading: false
    }
  },
  computed: {
    filteredLinks() {
      let result = [...this.links]
      
      // 分类筛选
      if (this.selectedCategory !== 'all') {
        result = result.filter(link => link.category === this.selectedCategory)
      }
      
      // 搜索筛选
      if (this.searchKeyword.trim()) {
        const keyword = this.searchKeyword.toLowerCase()
        result = result.filter(link => {
          return (
            link.name.toLowerCase().includes(keyword) ||
            link.description.toLowerCase().includes(keyword) ||
            link.tags.some(tag => tag.toLowerCase().includes(keyword))
          )
        })
      }
      
      // 排序
      const visitCount = getVisitCount()
      const favorites = getFavorites()
      
      result = result.map(link => ({
        ...link,
        visitCount: visitCount[link.id] || 0,
        favoriteCount: favorites.includes(link.id) ? 1 : 0
      }))
      
      if (this.sortBy === 'visit') {
        result.sort((a, b) => b.visitCount - a.visitCount)
      } else {
        result.sort((a, b) => b.favoriteCount - a.favoriteCount)
      }
      
      return result
    },
    displayedLinks() {
      const start = (this.currentPage - 1) * this.pageSize
      const end = start + this.pageSize
      return this.filteredLinks.slice(start, end)
    },
    totalPages() {
      return Math.ceil(this.filteredLinks.length / this.pageSize)
    }
  },
  mounted() {
    this.loadLinks()
  },
  methods: {
    loadLinks() {
      this.loading = true
      // 模拟加载延迟
      setTimeout(() => {
        this.links = linksData
        this.loading = false
      }, 300)
    },
    handleCategoryChange(categoryId) {
      this.selectedCategory = categoryId
      this.currentPage = 1
    },
    handleSearchInput: debounce(function(keyword) {
      this.searchKeyword = keyword
      this.currentPage = 1
    }, 300),
    handleSearchClear() {
      this.searchKeyword = ''
      this.currentPage = 1
    },
    handleFavoriteChanged() {
      // 收藏状态变化时重新计算排序
      this.$forceUpdate()
    }
  },
  watch: {
    selectedCategory() {
      this.currentPage = 1
    }
  }
}
</script>

<style lang="scss" scoped>
.home-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 1rem;
  line-height: 1.2;

  @media (min-width: 768px) {
    font-size: 3rem;
  }

  .text-gradient {
    background: linear-gradient(135deg, #8080C0, #6366f1);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
}

h2 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
  display: flex;
  align-items: center;
  gap: 8px;
}
</style>

