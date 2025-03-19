import AppLoading from '@/components/app-loading/index.vue'
import { setupDirectives } from '@/directives'
import { setupAssets } from '@/plugins'
import { setupRouter } from '@/router'
import { setupStore } from '@/store'

import { createApp } from 'vue'
import App from './App.vue'

async function setupApp() {
  setupAssets()

  const appLoading = createApp(AppLoading)

  appLoading.mount('#appLoading')

  const app = createApp(App)

  setupStore(app)

  setupDirectives(app)

  await setupRouter(app)

  appLoading.unmount()

  app.mount('#app')
}
setupApp()
