import type { NavigationGuardNext, RouteLocationNormalizedGeneric, RouteLocationNormalizedLoadedGeneric } from 'vue-router'
import { useAuthStore, useRouteStore } from '@/store'

/**
 * @description 创建导航守卫
 */
export async function createPermissionGuard(to: RouteLocationNormalizedGeneric, _from: RouteLocationNormalizedLoadedGeneric, next: NavigationGuardNext) {
  const authStore = useAuthStore()
  const routeStore = useRouteStore()
  // 初始化权限路由
  /** 没有token */
  if (!authStore.isLogin) {
    const toName = to.name as string
    if (routeStore.isValidConstantRoute(toName) && !to.meta.permissions) {
      next()
    }
    else {
      const redirect = to.fullPath
      next({ name: import.meta.env.VITE_ROUTE_LOGIN_NAME, query: { redirect } })
    }
    return false
  }
  /** 有token已经登录的情况 */
  // 去往的路由是否需要权限
  const permissions: string[] = to.meta.permissions || []
  // 去往的路由设置的权限字段至少为一代表需要登录
  const needLogin = Boolean(permissions.length)
  // 用户权限在路由权限任意一个代表有权限
  const hasPermission = !permissions.length || permissions.some(item => authStore.userPermissions.includes(item))
  // 已登录状态跳转登录页，跳转至首页
  if (to.name === import.meta.env.VITE_ROUTE_LOGIN_NAME) {
    next({ name: import.meta.env.VITE_ROUTE_HOME_NAME })
  }
  else if (needLogin) {
    // 有权限直接通行，无权限去到无权限页面
    hasPermission ? next() : next({ name: import.meta.env.VITE_ROUTE_NOPERMISSIONS_NAME })
  }
  else {
    next()
  }
  return true
}
