import type { ConfigEnv, UserConfig } from 'vite'
import process from 'node:process'
import { defineConfig, loadEnv } from 'vite'
import { createViteProxy, getDirPath, getRootPath, setupVitePlugins, wrapperEnv } from './build'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode, isPreview }: ConfigEnv): UserConfig => {
  const isBuild = command === 'build'
  const enableProxy = command === 'serve' && !isPreview
  const root = process.cwd()
  const env = loadEnv(mode, root) as unknown as ImportMetaEnv
  const viteEnv = wrapperEnv(env)

  const rootPath = getRootPath()
  const srcPath = getDirPath()

  const { VITE_BASE_URL, VITE_PORT, VITE_OPEN, VITE_PROXY } = viteEnv

  return {
    base: VITE_BASE_URL,
    resolve: {
      alias: {
        '~': rootPath,
        '@': srcPath,
      },
    },

    plugins: setupVitePlugins(viteEnv, isBuild),

    server: {
      host: '0.0.0.0',
      port: VITE_PORT,
      open: VITE_OPEN,
      proxy: createViteProxy(enableProxy, VITE_PROXY),
    },

    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
        },
      },
    },

    build: {
      reportCompressedSize: false,
    },
  }
})
