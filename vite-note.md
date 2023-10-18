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