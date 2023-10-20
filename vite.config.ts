import { defineConfig,splitVendorChunkPlugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import checker from 'vite-plugin-checker'
import legacy from '@vitejs/plugin-legacy'
// import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // https://vite-plugin-checker.netlify.app/introduction/getting-started.html
    checker({
      // typescript: true,
      vueTsc: true, // vue3
      // vls: true,  //vue2
      // eslint: {
      //   lintCommand: 'eslint "./src/**/*.{ts,tsx}"',
      // },
      // stylelint: {
      //   lintCommand: 'stylelint ./src/**/*.{css,vue}',
      // },
    }),
    // 为传统浏览器提供支持
    legacy({
      targets: ['defaults', 'not IE 11'],
    }),
    // 产物分块策略
    splitVendorChunkPlugin()
  ],
  esbuild: {
    jsxFactory: 'h',
    jsxFragment: 'Fragment',
    jsxInject: `import React from 'react'`,
  },
  optimizeDeps:{
    include:['linked-dep']
  },
  build: {
    // lib: {
    //   // entry: resolve(__dirname, 'lib/main.js'),
    //   name: 'MyLib',
    //   fileName: 'my-lib',
    // },
    commonjsOptions: {
      include: [/linked-dep/, /node_modules/],
    },
    // 自定义构建
    rollupOptions: {
      // https://rollupjs.org/configuration-options/
      // 多页面应用模式
      // input: {
      //   main: resolve(__dirname, 'index.html'),
      //   nested: resolve(__dirname, 'nested/index.html'),
      // },
      external:['vue'],
      output:{
        globals: {
          vue: 'Vue',
        },
      }
    },
    // 文件变化时重新构建
    watch:{
       // https://rollupjs.org/configuration-options/#watch
    },
    // experimental: {
    //   renderBuiltUrl(filename: string, { hostId, hostType, type }: { hostId: string, hostType: 'js' | 'css' | 'html', type: 'public' | 'asset' }) {
    //     if (type === 'public') {
    //       return 'https://www.domain.com/' + filename
    //     }
    //     else if (path.extname(hostId) === '.js') {
    //       return { runtime: `window.__assetsPath(${JSON.stringify(filename)})` }
    //     }
    //     else {
    //       return 'https://cdn.domain.com/assets/' + filename
    //     }
    //   }
    // }
  },
})
