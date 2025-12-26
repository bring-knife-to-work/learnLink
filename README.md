# LearnLink - 学习网址汇集网站

一个基于 Vue2 + Tailwind CSS 开发的前端学习网址汇集网站，帮助开发者快速找到优质的学习资源。

## ✨ 功能特性

- 📚 **丰富的学习资源** - 汇集了前端学习网站、框架、UI组件库、工具插件等各类资源
- 🔍 **强大的搜索功能** - 支持按名称、描述、标签进行模糊搜索
- 📂 **分类浏览** - 按分类快速浏览相关资源
- ⭐ **收藏功能** - 收藏你喜欢的资源，使用 localStorage 本地存储
- 📊 **访问统计** - 记录资源访问次数，热门推荐排序
- 📱 **响应式设计** - 完美适配 PC、平板、移动端
- 🎨 **现代化UI** - 简洁清爽的界面设计，流畅的动画效果

## 🚀 快速开始

### 环境要求

- Node.js >= 14.0.0
- npm >= 6.0.0
- Vue CLI (全局安装: `npm install -g @vue/cli`)

### 安装依赖

```bash
npm install
```

### 开发运行

```bash
npm run serve
```

访问 `http://localhost:8080` 查看效果

### 构建生产版本

```bash
npm run build
```

构建产物将输出到 `dist` 目录

## 📁 项目结构

```
learnLink/
├── src/
│   ├── components/          # 通用组件
│   │   ├── LinkCard.vue     # 网址卡片组件
│   │   ├── SearchInput.vue  # 搜索输入框
│   │   ├── CategoryNav.vue  # 分类导航
│   │   ├── LoadingSkeleton.vue  # 加载骨架屏
│   │   └── EmptyState.vue   # 空状态组件
│   ├── views/               # 页面组件
│   │   ├── Home.vue         # 首页
│   │   ├── Category.vue      # 分类页
│   │   └── Search.vue        # 搜索页
│   ├── data/                # 数据文件
│   │   └── links.js         # 网址数据
│   ├── utils/               # 工具函数
│   │   ├── storage.js       # 本地存储工具
│   │   └── helpers.js       # 辅助函数
│   ├── router/              # 路由配置
│   │   └── index.js
│   ├── App.vue              # 根组件
│   ├── main.js              # 入口文件
│   └── style.css            # 全局样式
├── index.html               # HTML 模板
├── package.json             # 项目配置
├── vite.config.js           # Vite 配置
├── tailwind.config.js       # Tailwind 配置
└── README.md                # 项目说明
```

## 🎯 核心功能说明

### 1. 首页功能

- 展示网站介绍和热门推荐
- 快速搜索框
- 分类导航
- 按访问量/收藏数排序
- 分页展示

### 2. 分类页功能

- 按分类浏览资源
- 支持"全部"、"前端学习"、"前端框架"、"UI组件库"、"工具插件"等分类
- 分页展示

### 3. 搜索页功能

- 关键词搜索
- 支持搜索名称、描述、标签、分类
- 实时搜索（防抖处理）
- 搜索结果分页

### 4. 收藏功能

- 点击卡片上的收藏按钮即可收藏/取消收藏
- 收藏数据存储在 localStorage
- 收藏状态实时更新

### 5. 访问统计

- 点击"访问网站"链接时自动记录访问次数
- 访问数据存储在 localStorage
- 用于热门推荐排序

## 🎨 技术栈

- **Vue 2.7** - 渐进式 JavaScript 框架
- **Vue Router** - 官方路由管理器
- **Tailwind CSS** - 实用优先的 CSS 框架
- **Vue CLI** - Vue.js 官方脚手架工具

## 📦 部署到 GitHub Pages

### 方法一：使用 GitHub Actions（推荐）

1. 在项目根目录创建 `.github/workflows/deploy.yml`：

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm install
      
      - name: Build
        run: npm run build
      
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

2. 在 GitHub 仓库设置中启用 GitHub Pages，选择 `gh-pages` 分支

### 方法二：手动部署

1. 构建项目：
```bash
npm run build
```

2. 进入 `dist` 目录，初始化 git 并推送到 `gh-pages` 分支：
```bash
cd dist
git init
git add -A
git commit -m 'deploy'
git push -f git@github.com:你的用户名/learnLink.git main:gh-pages
```

3. 在 GitHub 仓库设置中启用 GitHub Pages

### 注意事项

- 项目已配置为使用 `hash` 路由模式，适合 GitHub Pages 部署
- 确保 `vue.config.js` 中的 `publicPath` 在生产环境设置为 `'./'`
- 如果使用自定义域名，需要相应调整配置

## 🔧 配置说明

### 修改主色调

在 `tailwind.config.js` 中修改 `primary` 颜色：

```javascript
colors: {
  primary: '#8080C0',  // 修改为你想要的颜色
}
```

### 修改开发服务器端口

在 `vue.config.js` 中添加：

```javascript
module.exports = defineConfig({
  devServer: {
    port: 8080  // 修改为你想要的端口
  }
})
```

### 添加新的网址资源

在 `src/data/links.js` 中的 `linksData` 数组添加新对象：

```javascript
{
  id: 57,
  name: '网站名称',
  url: 'https://example.com',
  description: '网站描述',
  category: '前端学习',  // 或 '前端框架'、'UI组件库'、'工具插件'
  tags: ['标签1', '标签2'],
  visitCount: 0,
  favoriteCount: 0
}
```

## 🚧 功能扩展建议

1. **用户系统** - 添加用户登录，云端同步收藏
2. **评论功能** - 允许用户对资源进行评论和评分
3. **标签筛选** - 支持按标签筛选资源
4. **导出功能** - 导出收藏列表为 JSON/CSV
5. **暗黑模式** - 添加暗黑主题支持
6. **PWA支持** - 添加离线访问和安装功能
7. **数据统计** - 添加更详细的数据统计和可视化
8. **分享功能** - 支持分享资源到社交媒体

## 📝 开发说明

### 代码规范

- 使用 ES6+ 语法
- 组件命名使用 PascalCase
- 变量和函数命名使用 camelCase
- 关键逻辑添加注释

### 组件设计

- **LinkCard**: 可复用的网址卡片组件，包含收藏、标签、链接等功能
- **SearchInput**: 带清除按钮的搜索输入框
- **CategoryNav**: 分类导航组件，支持选中状态
- **LoadingSkeleton**: 加载骨架屏，提升用户体验
- **EmptyState**: 空状态组件，统一空状态展示

## 📄 许可证

MIT License

## 👨‍💻 作者

LearnLink Team

---

如有问题或建议，欢迎提交 Issue 或 Pull Request！

