/**
 * @name AutoImportDeps
 * @description 按需加载，自动引入
 */

import AutoImport from 'unplugin-auto-import/vite'

export function AutoImportDeps() {
  return AutoImport({
    eslintrc: {
      enabled: false, // 自己使用eslint9需要生成文件并引入生成的global变量
      // filepath: './eslint-auto-import.json',
    },
    dts: 'src/typings/auto-imports.d.ts',
    imports: [
      'vue',
      'vue-router',
      {
        '@vueuse/core': [],
      },
    ],
  })
}
