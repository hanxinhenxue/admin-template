import type { RouteRecordNameGeneric, RouteRecordRaw } from 'vue-router'
/**
 * @description 获取所有固定路由的名称集合
 * @param routes - 固定路由
 */
export function getConstantRouteNames(routes: RouteRecordRaw[]) {
  return routes.map(route => getConstantRouteName(route)).flat(1)
}

/**
 * @description 获取所有固定路由的名称集合
 * @param route - 固定路由
 */
function getConstantRouteName(route: RouteRecordRaw) {
  const names = [route.name]
  if (route.children?.length) {
    names.push(...route.children.map(item => getConstantRouteName(item)).flat(1))
  }
  return names
}
/**
 * @description 获取缓存的路由对应组件的名称
 * @param routes - 转换后的vue路由
 */
export function getCacheRoutes(routes: RouteRecordRaw[]) {
  const cacheNames: RouteRecordNameGeneric[] = []
  routes.forEach((route) => {
    // 只需要获取二级路由的缓存的组件名
    if (hasChildren(route)) {
      route.children!.forEach((item) => {
        if (isKeepAlive(item)) {
          cacheNames.push(item.name)
        }
      })
    }
  })
  return cacheNames
}
/**
 * @description 判断路由是否缓存
 * @param route
 * @return boolean
 */
function isKeepAlive(route: RouteRecordRaw) {
  return Boolean(route?.meta?.keepAlive)
}
/**
 * @description 是否有嵌套路由
 * @param route
 */
function hasChildren(route: RouteRecordRaw) {
  return Boolean(route.children && route.children.length)
}
