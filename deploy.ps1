# PowerShell 部署脚本
# 用于部署 LearnLink 到 GitHub Pages

Write-Host "开始部署 LearnLink..." -ForegroundColor Green

# 检查是否在正确的目录
if (-not (Test-Path "package.json")) {
    Write-Host "错误: 请在项目根目录运行此脚本" -ForegroundColor Red
    exit 1
}

# 构建项目
Write-Host "`n1. 构建项目..." -ForegroundColor Yellow
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "构建失败！" -ForegroundColor Red
    exit 1
}

Write-Host "构建成功！" -ForegroundColor Green

# 进入 dist 目录
Write-Host "`n2. 准备部署文件..." -ForegroundColor Yellow
Set-Location dist

# 初始化 git（如果需要）
if (-not (Test-Path ".git")) {
    git init
    git checkout -b gh-pages
}

# 添加文件
git add -A
$commitMessage = "Deploy: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
git commit -m $commitMessage

# 添加远程仓库（如果还没有）
$remoteUrl = "https://github.com/bring-knife-to-work/learnLink.git"
$existingRemote = git remote get-url origin 2>$null

if (-not $existingRemote) {
    git remote add origin $remoteUrl
} else {
    git remote set-url origin $remoteUrl
}

# 推送到 gh-pages 分支
Write-Host "`n3. 推送到 GitHub Pages..." -ForegroundColor Yellow
Write-Host "注意: 如果推送失败，请检查网络连接或使用 SSH" -ForegroundColor Cyan

git push -f origin HEAD:gh-pages

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n部署成功！" -ForegroundColor Green
    Write-Host "网站地址: https://bring-knife-to-work.github.io/learnLink/" -ForegroundColor Cyan
} else {
    Write-Host "`n推送失败，请尝试以下方法:" -ForegroundColor Red
    Write-Host "1. 检查网络连接" -ForegroundColor Yellow
    Write-Host "2. 使用 SSH: git remote set-url origin git@github.com:bring-knife-to-work/learnLink.git" -ForegroundColor Yellow
    Write-Host "3. 手动在 GitHub 网页上操作" -ForegroundColor Yellow
}

# 返回原目录
Set-Location ..

