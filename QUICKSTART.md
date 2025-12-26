# 快速开始指南

## 安装和运行

### 1. 安装依赖

```bash
npm install
```

### 2. 启动开发服务器

```bash
npm run serve
```

浏览器会自动打开 `http://localhost:8080`

### 3. 构建生产版本

```bash
npm run build
```

构建完成后，`dist` 目录包含所有静态文件，可以直接部署。

## 功能演示

### 首页功能

1. **浏览热门推荐** - 首页默认显示按访问量排序的热门资源
2. **快速搜索** - 在顶部搜索框输入关键词，实时搜索
3. **分类筛选** - 点击分类按钮，筛选不同类别的资源
4. **切换排序** - 点击"按收藏数排序"或"按访问量排序"切换排序方式
5. **收藏资源** - 点击卡片右上角的星星图标收藏/取消收藏
6. **访问网站** - 点击"访问网站"链接，在新标签页打开资源

### 分类页功能

1. **选择分类** - 点击导航栏的"分类"或首页的分类按钮
2. **浏览分类资源** - 查看该分类下的所有资源
3. **切换分类** - 使用分类导航切换不同分类
4. **分页浏览** - 资源较多时使用分页功能

### 搜索页功能

1. **输入关键词** - 在搜索框输入要搜索的关键词
2. **实时搜索** - 输入后自动搜索（防抖300ms）
3. **查看结果** - 搜索结果会高亮显示匹配的关键词
4. **清空搜索** - 点击搜索框右侧的X按钮清空搜索

## 数据管理

### 收藏数据

- 收藏数据存储在浏览器的 `localStorage` 中
- 键名：`learnlink_favorites`
- 格式：`[1, 2, 3]` (资源ID数组)

### 访问统计

- 访问统计数据存储在浏览器的 `localStorage` 中
- 键名：`learnlink_visit_count`
- 格式：`{"1": 5, "2": 3}` (资源ID: 访问次数)

### 清除数据

如果需要清除所有本地数据，可以在浏览器控制台执行：

```javascript
localStorage.removeItem('learnlink_favorites')
localStorage.removeItem('learnlink_visit_count')
```

## 部署到 GitHub Pages

### 方法一：使用 GitHub Actions（推荐）

1. 将代码推送到 GitHub 仓库
2. 在仓库的 Settings > Pages 中启用 GitHub Pages
3. 选择 Source 为 "GitHub Actions"
4. 每次推送到 `main` 分支时，会自动构建并部署

### 方法二：手动部署

1. 构建项目：`npm run build`
2. 进入 `dist` 目录
3. 初始化 git 并推送到 `gh-pages` 分支：

```bash
cd dist
git init
git add -A
git commit -m 'deploy'
git branch -M main
git remote add origin https://github.com/你的用户名/learnLink.git
git push -f origin main:gh-pages
```

4. 在仓库的 Settings > Pages 中启用 GitHub Pages，选择 `gh-pages` 分支

## 常见问题

### Q: 页面空白？

A: 检查浏览器控制台是否有错误，确保所有依赖已正确安装。

### Q: 样式不生效？

A: 确保 Tailwind CSS 已正确配置，检查 `tailwind.config.js` 和 `postcss.config.js`。Vue CLI 会自动处理 PostCSS 配置。

### Q: 路由不工作？

A: 项目使用 hash 路由模式，URL 应该是 `#/category` 这样的格式。

### Q: 收藏功能不工作？

A: 检查浏览器是否允许 localStorage，某些隐私模式下可能被禁用。

## 开发建议

1. **添加新资源** - 在 `src/data/links.js` 中添加新的链接对象
2. **修改样式** - 在 `tailwind.config.js` 中修改主题配置
3. **添加新页面** - 在 `src/views/` 中创建新组件，在 `src/router/index.js` 中添加路由
4. **自定义组件** - 在 `src/components/` 中创建可复用组件

## 技术支持

如有问题，请查看：
- [Vue 2 文档](https://v2.cn.vuejs.org/)
- [Vue CLI 文档](https://cli.vuejs.org/zh/)
- [Tailwind CSS 文档](https://tailwindcss.com/docs)

