/**
 * @description store状态管理
 */
import type { App } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

export function setupStore(app: App) {
	const store = createPinia()
	store.use(piniaPluginPersistedstate)
	app.use(store)
}
