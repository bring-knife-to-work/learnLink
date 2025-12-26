# 部署指南

## 方式一：使用 GitHub Actions 自动部署（推荐）

### 1. 推送代码到 GitHub

如果遇到网络问题，可以尝试以下方法：

#### 方法 A：使用 SSH（推荐）
```bash
# 如果还没有配置 SSH，先配置 SSH key
# 然后使用 SSH URL
git remote set-url origin git@github.com:bring-knife-to-work/learnLink.git
git push -u origin main
```

#### 方法 B：使用 GitHub CLI
```bash
# 安装 GitHub CLI 后
gh auth login
gh repo create bring-knife-to-work/learnLink --public --source=. --remote=origin
git push -u origin main
```

#### 方法 C：手动在 GitHub 网页创建仓库后推送
1. 访问 https://github.com/bring-knife-to-work/learnLink
2. 如果仓库已存在但为空，按照页面提示操作
3. 或者使用以下命令：
```bash
git push -u origin main
```

### 2. 启用 GitHub Pages

1. 进入仓库 Settings
2. 找到 "Pages" 选项
3. 在 "Source" 中选择 "GitHub Actions"
4. 保存设置

### 3. 触发部署

- 推送代码到 `main` 分支后，GitHub Actions 会自动触发
- 查看 Actions 标签页，确认部署状态
- 部署完成后，访问：`https://bring-knife-to-work.github.io/learnLink/`

## 方式二：手动部署到 GitHub Pages

### 1. 构建项目

```bash
npm run build
```

### 2. 部署到 gh-pages 分支

```bash
# 进入 dist 目录
cd dist

# 初始化 git（如果还没有）
git init
git add -A
git commit -m "Deploy to GitHub Pages"

# 推送到 gh-pages 分支
git push -f git@github.com:bring-knife-to-work/learnLink.git main:gh-pages

# 或者使用 HTTPS
git push -f https://github.com/bring-knife-to-work/learnLink.git main:gh-pages
```

### 3. 配置 GitHub Pages

1. 进入仓库 Settings > Pages
2. 在 "Source" 中选择 "Deploy from a branch"
3. 选择分支：`gh-pages`
4. 选择文件夹：`/ (root)`
5. 点击 Save

## 方式三：使用 Vercel/Netlify 部署

### Vercel 部署

1. 访问 https://vercel.com
2. 导入 GitHub 仓库
3. 配置：
   - Framework Preset: Vue.js
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. 点击 Deploy

### Netlify 部署

1. 访问 https://netlify.com
2. 导入 GitHub 仓库
3. 配置：
   - Build command: `npm run build`
   - Publish directory: `dist`
4. 点击 Deploy site

## 故障排除

### 推送失败

1. **检查网络连接**
   ```bash
   ping github.com
   ```

2. **使用代理或 VPN**

3. **检查 Git 配置**
   ```bash
   git config --global user.name "Your Name"
   git config --global user.email "your.email@example.com"
   ```

4. **使用 GitHub Desktop**
   - 下载 GitHub Desktop
   - 使用图形界面推送代码

### GitHub Actions 部署失败

1. 检查 Actions 标签页的错误信息
2. 确保 `package.json` 中的脚本正确
3. 确保 Node.js 版本兼容（项目使用 Node 18+）

### 页面显示 404

1. 确保使用 hash 路由模式（已配置）
2. 检查 `vue.config.js` 中的 `publicPath` 设置
3. 确保 GitHub Pages 源设置正确

## 访问地址

部署成功后，网站地址为：
- GitHub Pages: `https://bring-knife-to-work.github.io/learnLink/`
- 自定义域名：可在 Settings > Pages 中配置

## 更新部署

每次更新代码后：

1. **使用 GitHub Actions（自动）**
   ```bash
   git add .
   git commit -m "Update: 描述你的更改"
   git push origin main
   ```
   GitHub Actions 会自动构建并部署

2. **手动部署**
   ```bash
   npm run build
   cd dist
   git add .
   git commit -m "Deploy update"
   git push origin gh-pages
   ```

