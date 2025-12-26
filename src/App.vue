<template>
  <div id="app" class="min-h-screen">
    <!-- 导航栏 -->
    <nav class="bg-white shadow-md sticky top-0 z-50">
      <div class="container mx-auto px-4 py-4">
        <div class="flex items-center justify-between">
          <!-- Logo -->
          <router-link to="/" class="flex items-center space-x-2 group logo-container">
            <div class="w-10 h-10 bg-primary rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform logo-box">
              <span class="text-white text-xl font-bold">L</span>
            </div>
            <span class="text-xl font-bold text-gray-800">LearnLink</span>
          </router-link>
          
          <!-- 导航菜单 -->
          <div class="hidden md:flex items-center space-x-6">
            <router-link 
              to="/" 
              class="nav-link"
              :class="{ 'active': $route.name === 'Home' }"
            >
              首页
            </router-link>
            <router-link 
              to="/category" 
              class="nav-link"
              :class="{ 'active': $route.name === 'Category' }"
            >
              分类
            </router-link>
            <router-link 
              to="/search" 
              class="nav-link"
              :class="{ 'active': $route.name === 'Search' }"
            >
              搜索
            </router-link>
          </div>
          
          <!-- 移动端菜单按钮 -->
          <button 
            @click="mobileMenuOpen = !mobileMenuOpen"
            class="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path v-if="!mobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <!-- 移动端菜单 -->
        <div 
          v-show="mobileMenuOpen"
          class="md:hidden mt-4 pb-2 space-y-2"
        >
          <router-link 
            to="/" 
            class="block px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
            :class="{ 'bg-primary text-white': $route.name === 'Home' }"
            @click="mobileMenuOpen = false"
          >
            首页
          </router-link>
          <router-link 
            to="/category" 
            class="block px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
            :class="{ 'bg-primary text-white': $route.name === 'Category' }"
            @click="mobileMenuOpen = false"
          >
            分类
          </router-link>
          <router-link 
            to="/search" 
            class="block px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
            :class="{ 'bg-primary text-white': $route.name === 'Search' }"
            @click="mobileMenuOpen = false"
          >
            搜索
          </router-link>
        </div>
      </div>
    </nav>
    
    <!-- 主要内容区域 -->
    <main class="container mx-auto px-4 py-8">
      <transition name="fade" mode="out-in">
        <router-view />
      </transition>
    </main>
    
    <!-- 页脚 -->
    <footer class="bg-white border-t mt-16">
      <div class="container mx-auto px-4 py-6">
        <div class="space-y-4">
          <!-- 免责声明 -->
          <div class="text-center text-sm text-gray-500 max-w-3xl mx-auto">
            <p class="font-semibold text-gray-700 mb-2">免责声明</p>
            <p class="leading-relaxed">
              本网站仅提供学习网址的收集和整理服务，所有链接均来源于公开网络。
              本站不对任何外部网站的内容、准确性、合法性或可用性负责。
              用户访问外部链接时需自行判断和承担风险，本站不承担任何责任。
            </p>
          </div>
          
          <!-- 分隔线 -->
          <div class="border-t border-gray-200 my-4"></div>
          
          <!-- 版权和个人签名 -->
          <div class="text-center text-gray-600">
            <p>&copy; 2025 LearnLink. 学习网址汇集网站</p>
            <p class="mt-2 text-sm text-gray-500">
              Made with <span class="text-red-500">❤</span> by 万涛（上班带刀）
            </p>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      mobileMenuOpen: false
    }
  },
  watch: {
    $route() {
      // 路由切换时关闭移动端菜单
      this.mobileMenuOpen = false
    }
  }
}
</script>

<style lang="scss" scoped>
nav {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid rgba(128, 128, 192, 0.1);

  .logo-container {
    transition: transform 0.3s;

    &:hover {
      transform: scale(1.05);
    }

    .logo-box {
      background: linear-gradient(135deg, #8080C0, #6366f1);
      box-shadow: 0 4px 12px rgba(128, 128, 192, 0.3);
    }
  }
}

.nav-link {
  padding: 8px 16px;
  border-radius: 8px;
  color: #374151;
  transition: all 0.3s;
  font-weight: 500;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 2px;
    background: linear-gradient(90deg, #8080C0, #6366f1);
    transition: width 0.3s;
  }

  &:hover {
    background: rgba(128, 128, 192, 0.1);
    color: #8080C0;

    &::before {
      width: 80%;
    }
  }

  &.active {
    background: linear-gradient(135deg, #8080C0, #6366f1);
    color: white;
    box-shadow: 0 4px 12px rgba(128, 128, 192, 0.3);

    &::before {
      display: none;
    }
  }
}

footer {
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.8), rgba(249, 250, 251, 0.8));
  backdrop-filter: blur(10px);
}
</style>

