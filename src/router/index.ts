import type { App } from 'vue'
import type { RouterHistory } from 'vue-router'
import { useAuthStore, useRouteStore } from '@/store'
import { createMemoryHistory, createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import { setupRouterGuards } from './guard'
import { CATCH_ROUTE, CONSTANT_ROUTES } from './routes/basic-routes'

const { VITE_ROUTER_HISTORY_MODE = 'history', VITE_BASE_URL } = import.meta.env

const historyCreatorMap: Record<Env.RouterHistoryMode, (base?: string) => RouterHistory> = {
  hash: createWebHashHistory,
  history: createWebHistory,
  memory: createMemoryHistory,
}

const EMPTY_ROUTE = {
  name: 'Empty',
  path: '/:pathMatch(.*)*',
  component: null,
  children: [],
}

export const router = createRouter({
  history: historyCreatorMap[VITE_ROUTER_HISTORY_MODE](VITE_BASE_URL),
  routes: CONSTANT_ROUTES,
  scrollBehavior: () => ({ left: 0, top: 0 }),
})

/**
 * @description 安装路由函数
 */
export async function setupRouter(app: App) {
  await addDynamicRoutes()
  setupRouterGuards(router)
  app.use(router)
  await router.isReady()
}

export async function addDynamicRoutes() {
  const authStore = useAuthStore()
  // 没有token情况
  if (!authStore.isLogin) {
    return router.addRoute(EMPTY_ROUTE)
  }

  // 有token的情况
  try {
    const useRoute = useRouteStore()
    const accessRoutes = useRoute.generateRoutes(authStore.userPermissions)
    accessRoutes.forEach((route) => {
      !router.hasRoute(route.name) && router.addRoute(route)
    })
    router.hasRoute(EMPTY_ROUTE.name) && router.removeRoute(EMPTY_ROUTE.name)
    router.addRoute(CATCH_ROUTE)
  }
  catch (error) {
    console.error(error)
  }
}
export async function resetRouter() {
  const basicRouteNames = getRouteNames(CONSTANT_ROUTES)
  router.getRoutes().forEach((route) => {
    const name = route.name
    if (!basicRouteNames.includes(name)) {
      router.removeRoute(name)
    }
  })
}
export function getRouteNames(routes) {
  return routes.map(route => getRouteName(route)).flat(1)
}

function getRouteName(route) {
  const names = [route.name]
  if (route.children && route.children.length) {
    names.push(...route.children.map(item => getRouteName(item)).flat(1))
  }
  return names
}
