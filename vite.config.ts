import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import checker from 'vite-plugin-checker'
import legacy from '@vitejs/plugin-legacy'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // https://vite-plugin-checker.netlify.app/introduction/getting-started.html
    checker({
      typescript: true,
      vueTsc: true, // vue3
      vls: true,  //vue2
      eslint: {
        lintCommand: 'eslint "./src/**/*.{ts,tsx}"',
      },
      stylelint: {
        lintCommand: 'stylelint ./src/**/*.{css,vue}',
      },
    }),
    // 为传统浏览器提供支持
    legacy({
      targets: ['defaults', 'not IE 11'],
    }),
  ],
  esbuild: {
    jsxFactory: 'h',
    jsxFragment: 'Fragment',
    jsxInject: `import React from 'react'`,
  },
})
