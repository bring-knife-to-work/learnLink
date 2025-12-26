<template>
  <div class="link-card">
    <div class="flex items-start justify-between mb-4">
      <div class="flex-1">
        <h3 class="text-lg font-semibold text-gray-800 mb-2 line-clamp-1">
          {{ link.name }}
        </h3>
        <p class="text-sm text-gray-600 mb-3 line-clamp-2">
          {{ link.description }}
        </p>
      </div>
      
      <!-- 收藏按钮 -->
      <button
        @click="toggleFavorite"
        class="ml-4 p-2 rounded-full btn-click flex-shrink-0"
        :class="isFav ? 'favorite bg-yellow-100 text-yellow-600' : 'bg-gray-100 text-gray-400 hover:bg-gray-200'"
        :title="isFav ? '取消收藏' : '收藏'"
      >
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      </button>
    </div>
    
    <!-- 标签 -->
    <div class="flex flex-wrap gap-2 mb-4">
      <span 
        v-for="tag in link.tags" 
        :key="tag"
        class="px-2 py-1 text-xs bg-primary bg-opacity-10 text-primary rounded-full"
      >
        {{ tag }}
      </span>
    </div>
    
    <!-- 链接和分类 -->
    <div class="flex items-center justify-between pt-4 border-t border-gray-100">
      <span class="text-xs text-gray-500">
        {{ link.category }}
      </span>
      <a
        :href="link.url"
        target="_blank"
        rel="noopener noreferrer"
        @click="handleLinkClick"
        class="text-primary hover:text-primary-dark font-medium text-sm flex items-center space-x-1 transition-colors"
      >
        <span>访问网站</span>
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </a>
    </div>
  </div>
</template>

<script>
import { isFavorite, addFavorite, removeFavorite } from '@/utils/storage'
import { incrementVisitCount } from '@/utils/storage'

export default {
  name: 'LinkCard',
  props: {
    link: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isFav: false
    }
  },
  mounted() {
    this.isFav = isFavorite(this.link.id)
  },
  methods: {
    toggleFavorite() {
      if (this.isFav) {
        removeFavorite(this.link.id)
        this.isFav = false
      } else {
        addFavorite(this.link.id)
        this.isFav = true
      }
      // 触发收藏变化事件
      this.$emit('favorite-changed')
    },
    handleLinkClick() {
      // 记录访问次数
      incrementVisitCount(this.link.id)
    }
  },
  watch: {
    'link.id'() {
      this.isFav = isFavorite(this.link.id)
    }
  }
}
</script>

<style lang="scss" scoped>
.link-card {
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid rgba(128, 128, 192, 0.1);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(128, 128, 192, 0.1), transparent);
    transition: left 0.5s;
  }

  &:hover {
    transform: translateY(-4px) scale(1.02);
    box-shadow: 0 12px 24px rgba(128, 128, 192, 0.2);
    border-color: rgba(128, 128, 192, 0.3);

    &::before {
      left: 100%;
    }
  }

  h3 {
    color: #1f2937;
    font-weight: 600;
    margin-bottom: 8px;
    transition: color 0.3s;

    &:hover {
      color: #8080C0;
    }
  }

  p {
    color: #6b7280;
    line-height: 1.6;
  }

  // 收藏按钮美化
  button {
    transition: all 0.3s;

    &:hover {
      transform: scale(1.1);
    }

    &.favorite {
      background: linear-gradient(135deg, #fef3c7, #fde68a) !important;
      color: #f59e0b !important;
      box-shadow: 0 4px 12px rgba(245, 158, 11, 0.3);
    }
  }

  // 标签美化
  span[class*="bg-primary"] {
    background: linear-gradient(135deg, rgba(128, 128, 192, 0.1), rgba(128, 128, 192, 0.15)) !important;
    color: #8080C0;
    font-weight: 500;
    padding: 4px 12px;
    border-radius: 12px;
    transition: all 0.2s;

    &:hover {
      background: linear-gradient(135deg, rgba(128, 128, 192, 0.2), rgba(128, 128, 192, 0.25)) !important;
      transform: translateY(-1px);
    }
  }

  // 链接美化
  a {
    position: relative;
    padding: 4px 0;

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 0;
      height: 2px;
      background: linear-gradient(90deg, #8080C0, #6366f1);
      transition: width 0.3s;
    }

    &:hover::after {
      width: 100%;
    }

    svg {
      transition: transform 0.3s;
    }

    &:hover svg {
      transform: translate(2px, -2px);
    }
  }
}
</style>

