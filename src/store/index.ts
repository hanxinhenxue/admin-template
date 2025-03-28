/**
 * @description store状态管理
 */
import type { App } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { resetSetupStore } from './plugins'

export function setupStore(app: App) {
  const store = createPinia()
  store.use(piniaPluginPersistedstate)
  store.use(resetSetupStore)
  app.use(store)
}

export * from './modules/index'
