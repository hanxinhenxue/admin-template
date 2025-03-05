import { setupAssets } from '@/plugins'
import { setupStore } from '@/store'

import { createApp } from 'vue'
import App from './App.vue'

async function setupApp() {
  setupAssets()

  const app = createApp(App)

  setupStore(app)

  app.mount('#app')
}
setupApp()
