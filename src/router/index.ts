import type { App } from 'vue'
import type { RouterHistory } from 'vue-router'
import { createMemoryHistory, createRouter, createWebHashHistory, createWebHistory } from 'vue-router'

const { VITE_ROUTER_HISTORY_MODE = 'history', VITE_BASE_URL } = import.meta.env

const historyCreatorMap: Record<Env.RouterHistoryMode, (base?: string) => RouterHistory> = {
  hash: createWebHashHistory,
  history: createWebHistory,
  memory: createMemoryHistory,
}

export const router = createRouter({
  history: historyCreatorMap[VITE_ROUTER_HISTORY_MODE](VITE_BASE_URL),
  routes: [
    {
      name: 'home',
      path: '/home',
      component: () => import('@/views/home/index.vue'),
    },
  ],
})

export async function setupRouter(app: App) {
  app.use(router)
  await router.isReady()
}
