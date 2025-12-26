<template>
  <div>
    <!-- 页面标题 -->
    <div class="mb-8">
      <h1 class="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
        分类浏览
      </h1>
      <p class="text-gray-600">
        按分类浏览学习资源
      </p>
    </div>
    
    <!-- 分类导航 -->
    <CategoryNav
      :categories="categories"
      :selected-category="currentCategory"
      @category-change="handleCategoryChange"
    />
    
    <!-- 加载状态 -->
    <LoadingSkeleton v-if="loading" :count="6" />
    
    <!-- 网址卡片列表 -->
    <div v-else-if="displayedLinks.length > 0">
      <div class="mb-4 text-gray-600">
        共找到 <span class="font-semibold text-primary">{{ filteredLinks.length }}</span> 个资源
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <LinkCard
          v-for="link in displayedLinks"
          :key="link.id"
          :link="link"
          @favorite-changed="handleFavoriteChanged"
        />
      </div>
    </div>
    
    <!-- 空状态 -->
    <EmptyState
      v-else
      icon="📂"
      title="该分类暂无资源"
      message="请选择其他分类查看"
    />
    
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
import { getFavorites } from '@/utils/storage'
import LinkCard from '@/components/LinkCard.vue'
import CategoryNav from '@/components/CategoryNav.vue'
import LoadingSkeleton from '@/components/LoadingSkeleton.vue'
import EmptyState from '@/components/EmptyState.vue'

export default {
  name: 'Category',
  components: {
    LinkCard,
    CategoryNav,
    LoadingSkeleton,
    EmptyState
  },
  data() {
    return {
      links: [],
      categories,
      currentCategory: 'all',
      currentPage: 1,
      pageSize: 12,
      loading: false
    }
  },
  computed: {
    filteredLinks() {
      if (this.currentCategory === 'all') {
        return this.links
      }
      return this.links.filter(link => link.category === this.currentCategory)
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
    // 从路由参数获取分类
    if (this.$route.params.categoryId) {
      this.currentCategory = this.$route.params.categoryId
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
    handleCategoryChange(categoryId) {
      this.currentCategory = categoryId
      this.currentPage = 1
      // 更新路由
      this.$router.push({
        name: 'Category',
        params: { categoryId: categoryId === 'all' ? undefined : categoryId }
      })
    },
    handleFavoriteChanged() {
      this.$forceUpdate()
    }
  },
  watch: {
    '$route.params.categoryId'(newVal) {
      if (newVal) {
        this.currentCategory = newVal
      } else {
        this.currentCategory = 'all'
      }
      this.currentPage = 1
    }
  }
}
</script>

