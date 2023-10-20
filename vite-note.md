# 命令行

## 开发服务器
vite  // 在当前目录下启动 Vite 开发服务器

## 构建
vite build  // 构建生产版本

## 其他
vite optimize // 预购建依赖
vite preview  // 本地预览构建产物

# 使用插件

## 查找插件
npm Vite
npm Rollup

## 强制插件排序
使用 enforce 修饰符来强制插件的位置
  pre：在 Vite 核心插件之前调用该插件
  默认：在 Vite 核心插件之后调用该插件
  post：在 Vite 构建插件之后调用该插件

## 按需应用
默认情况下插件在开发 (serve) 和生产 (build) 模式中都会调用。如果插件在服务或构建期间按需使用，请使用 apply 属性指明它们仅在 'build' 或 'serve' 模式时调用

# 依赖预构建 2023-10-20
依赖预构建仅适用于开发模式，并使用 esbuild 将依赖项转换为 ES 模块。在生产构建中，将使用 @rollup/plugin-commonjs
当对链接的依赖进行更改时，请使用 --force 命令行选项重新启动开发服务器

# 静态资源处理
？url、？raw、？worker、？sharedworker
import.meta.url

# 部署静态站点
GitHub Pages
1.在 vite.config.js 中设置正确的 base。
  如果你要部署在 https://<USERNAME>.github.io/ 上，你可以省略 base 使其默认为 '/'。
  如果你要部署在 https://<USERNAME>.github.io/<REPO>/ 上，例如你的仓库地址为 https://github.com/<USERNAME>/<REPO>，那么请设置 base 为 '/<REPO>/'。

2.进入仓库 settings 页面的 GitHub Pages 配置，选择部署来源为“GitHub Actions”，这将引导你创建一个构建和部署项目的工作流程，我们提供了一个安装依赖项和使用 npm 构建的工作流程样本：

# 将静态内容部署到 GitHub Pages 的简易工作流程
name: Deploy static content to Pages

on:
  # 仅在推送到默认分支时运行。
  push:
    branches: ['main']

  # 这个选项可以使你手动在 Action tab 页面触发工作流
  workflow_dispatch:

# 设置 GITHUB_TOKEN 的权限，以允许部署到 GitHub Pages。
permissions:
  contents: read
  pages: write
  id-token: write

# 允许一个并发的部署
concurrency:
  group: 'pages'
  cancel-in-progress: true

jobs:
  # 单次部署的工作描述
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3
      - name: Set up Node
        uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: 'npm'
      - name: Install dependencies
        run: npm install
      - name: Build
        run: npm run build
      - name: Setup Pages
        uses: actions/configure-pages@v3
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v1
        with:
          # Upload dist repository
          path: './dist'
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v1

# 环境变量
import.meta.env.MODE: {string} 应用运行的模式
import.meta.env.BASE_URL: {string} 部署应用时的基本 URL。他由base 配置项决定
import.meta.env.PROD: {boolean} 应用是否运行在生产环境
import.meta.env.DEV: {boolean} 应用是否运行在开发环境 (永远与 import.meta.env.PROD相反)
import.meta.env.SSR: {boolean} 应用是否运行在 server 上

# .env文件
.env                # 所有情况下都会加载
.env.local          # 所有情况下都会加载，但会被 git 忽略
.env.[mode]         # 只在指定模式下加载
.env.[mode].local   # 只在指定模式下加载，但会被 git 忽略
只有以 VITE_ 为前缀的变量才会暴露给经过 vite 处理的代码