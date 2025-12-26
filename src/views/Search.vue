<template>
  <div>
    <!-- 页面标题 -->
    <div class="mb-8">
      <h1 class="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
        搜索资源
      </h1>
      <p class="text-gray-600">
        搜索你需要的学习资源
      </p>
    </div>
    
    <!-- 搜索框 -->
    <div class="max-w-2xl mx-auto mb-8">
      <SearchInput
        :value="searchKeyword"
        @input="handleSearchInput"
        @clear="handleSearchClear"
        placeholder="输入关键词搜索网址、描述、标签..."
      />
    </div>
    
    <!-- 搜索结果统计 -->
    <div v-if="searchKeyword && !loading" class="mb-6 text-gray-600">
      共找到 <span class="font-semibold text-primary">{{ filteredLinks.length }}</span> 个相关资源
    </div>
    
    <!-- 加载状态 -->
    <LoadingSkeleton v-if="loading" :count="6" />
    
    <!-- 搜索结果 -->
    <div v-else-if="searchKeyword && filteredLinks.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <LinkCard
        v-for="link in displayedLinks"
        :key="link.id"
        :link="link"
        @favorite-changed="handleFavoriteChanged"
      />
    </div>
    
    <!-- 空状态 -->
    <EmptyState
      v-else-if="searchKeyword && filteredLinks.length === 0"
      icon="🔍"
      title="未找到相关资源"
      message="试试其他关键词吧"
    >
      <button
        @click="handleSearchClear"
        class="mt-4 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
      >
        清空搜索
      </button>
    </EmptyState>
    
    <!-- 默认提示 -->
    <EmptyState
      v-else
      icon="🔍"
      title="开始搜索"
      message="在上方输入框中输入关键词进行搜索"
    />
    
    <!-- 分页 -->
    <div v-if="searchKeyword && totalPages > 1" class="flex justify-center items-center space-x-2 mt-8">
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
import { linksData } from '@/data/links'
import { getFavorites } from '@/utils/storage'
import { debounce } from '@/utils/helpers'
import LinkCard from '@/components/LinkCard.vue'
import SearchInput from '@/components/SearchInput.vue'
import LoadingSkeleton from '@/components/LoadingSkeleton.vue'
import EmptyState from '@/components/EmptyState.vue'

export default {
  name: 'Search',
  components: {
    LinkCard,
    SearchInput,
    LoadingSkeleton,
    EmptyState
  },
  data() {
    return {
      links: [],
      searchKeyword: '',
      currentPage: 1,
      pageSize: 12,
      loading: false
    }
  },
  computed: {
    filteredLinks() {
      if (!this.searchKeyword.trim()) {
        return []
      }
      
      const keyword = this.searchKeyword.toLowerCase()
      return this.links.filter(link => {
        return (
          link.name.toLowerCase().includes(keyword) ||
          link.description.toLowerCase().includes(keyword) ||
          link.tags.some(tag => tag.toLowerCase().includes(keyword)) ||
          link.category.toLowerCase().includes(keyword)
        )
      })
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
    // 从路由查询参数获取搜索关键词
    if (this.$route.query.q) {
      this.searchKeyword = this.$route.query.q
    }
    this.loadLinks()
  },
  methods: {
    loadLinks() {
      this.loading = true
      setTimeout(() => {
        this.links = linksData
        this.loading = false
      }, 300)
    },
    handleSearchInput: debounce(function(keyword) {
      this.searchKeyword = keyword
      this.currentPage = 1
      // 更新路由查询参数
      if (keyword) {
        this.$router.push({ query: { q: keyword } })
      } else {
        this.$router.push({ query: {} })
      }
    }, 300),
    handleSearchClear() {
      this.searchKeyword = ''
      this.currentPage = 1
      this.$router.push({ query: {} })
    },
    handleFavoriteChanged() {
      this.$forceUpdate()
    }
  },
  watch: {
    '$route.query.q'(newVal) {
      if (newVal) {
        this.searchKeyword = newVal
      }
    }
  }
}
</script>

