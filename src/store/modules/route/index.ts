import type { RouteRecordNameGeneric, RouteRecordRaw } from 'vue-router'

import asyncRoutes from '@/router/routes/async-routes'
import { CATCH_ROUTE, CONSTANT_ROUTES } from '@/router/routes/basic-routes'
import { useAppStore } from '@/store'
import { filterAsyncRoutes, getCacheRoutes, getConstantRouteNames } from '@/utils'
import { defineStore } from 'pinia'

export const useRouteStore = defineStore('route-store', () => {
  const accessRoutes = shallowRef<RouteRecordRaw[]>([])
  const cacheRoutes = shallowRef<RouteRecordNameGeneric[]>([])

  const routes = computed(() => accessRoutes.value.concat(CONSTANT_ROUTES))

  const menus = computed(() => routes.value.filter((route: RouteRecordRaw) => route.name && !route.hidden))

  /**
   * 是否是有效的固定路由
   * @param name 路由名称
   */
  function isValidConstantRoute(name: string) {
    const NOT_FOUND_PAGE_NAME = CATCH_ROUTE.name
    const constantRouteNames = getConstantRouteNames(CONSTANT_ROUTES)
    return constantRouteNames.includes(name) && name !== NOT_FOUND_PAGE_NAME
  }
  /**
   * 根据角色生成路由
   * @param role 角色
   */
  function generateRoutes(role: string[]) {
    const filterAccessRoutes = filterAsyncRoutes(asyncRoutes, role)
    accessRoutes.value = filterAccessRoutes
    cacheRoutes.value = getCacheRoutes(filterAccessRoutes)
    return accessRoutes
  }
  /**
   * 重置路由
   */
  function resetPermission() {
    const routeStore = useRouteStore()
    routeStore.$reset()
  }

  function removeCacheRoute(routeName: RouteRecordNameGeneric) {
    const index = cacheRoutes.value.findIndex(name => name === routeName)
    if (index !== -1) {
      cacheRoutes.value.splice(index, 1)
    }
  }

  function addCacheRoute(routeName: RouteRecordNameGeneric) {
    const index = cacheRoutes.value.indexOf(routeName)
    if (index === -1) {
      cacheRoutes.value.push(routeName)
    }
  }

  async function reCacheRoute(name: RouteRecordNameGeneric) {
    const { reloadPage } = useAppStore()
    const isCached = cacheRoutes.value.includes(name)
    if (isCached) {
      removeCacheRoute(name)
      await reloadPage()
      addCacheRoute(name)
    }
  }

  return {
    accessRoutes,
    cacheRoutes,
    routes,
    menus,
    isValidConstantRoute,
    generateRoutes,
    resetPermission,
    removeCacheRoute,
    addCacheRoute,
    reCacheRoute,
  }
})
