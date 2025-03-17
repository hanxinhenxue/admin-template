import type { RouteRecordRaw } from 'vue-router'
/**
 * 根据用户权限判断用户是否拥有访问该路由的权限
 * @param route - 当前路由
 * @param role - 用户权限
 */
export function hasPermission(route: RouteRecordRaw, role: string[]) {
  // 路由所需的权限
  const routeRole = route.meta?.permissions ? route.meta.permissions : []

  // 未设置路由权限的则判定有权限
  if (routeRole.length === 0)
    return true

  // * 登录用户没有分配权限默认无权限
  if (!role.length)
    return false

  // * 路由指定的角色包含任一登录用户角色则判定有权限
  return role.some(item => routeRole.includes(item))
}
export function filterAsyncRoutes(routes: RouteRecordRaw[] = [], role: string[] = []) {
  const ret: RouteRecordRaw[] = []
  routes.forEach((route) => {
    if (hasPermission(route, role)) {
      const curRoute: RouteRecordRaw = {
        ...route,
        children: [],
      }
      if (route.children && route.children.length) {
        curRoute.children = filterAsyncRoutes(route.children, role)
      }
      else {
        Reflect.deleteProperty(curRoute, 'children')
      }
      ret.push(curRoute)
    }
  })
  return ret
}
