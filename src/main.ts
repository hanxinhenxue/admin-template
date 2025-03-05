import { createApp } from 'vue'
import App from './App.vue'

import { setupAssets } from '@/plugins'
import { setupStore } from '@/store'

async function setupApp() {
	setupAssets()

	const app = createApp(App)

	setupStore(app)

	app.mount('#app')
}
setupApp()
