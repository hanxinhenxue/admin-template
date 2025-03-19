import type { RouteRecordNameGeneric } from 'vue-router'
import { localStg } from '@/utils'
/**
 * @description 对meta中icon和localIcon属性进行处理
 * @param route 路由
 */
function getRouteIcons(route: App.Global.TabRoute) {
  let icon = route?.meta?.icon || 'ep:menu'
  let localIcon = route?.meta?.localIcon
  if (route.matched) {
    const currentRoute = route.matched.find(r => r.name === route.name)
    icon = currentRoute?.meta?.icon || icon
    localIcon = currentRoute?.meta?.localIcon
  }

  return { icon, localIcon }
}
/**
 * @description 根据路由获取tab路由
 * @param route
 */
export function getTabRouteByVueRoute(route: App.Global.TabRoute) {
  const { name, path, fullPath = path, meta } = route
  const { icon, localIcon } = getRouteIcons(route)
  const tabRoute = {
    name,
    path,
    fullPath,
    meta: {
      ...meta,
      icon,
      localIcon,
    },
  }
  return tabRoute
}
/**
 * @description 获取该页签在多页签数据中的索引
 * @param tabs - 多页签数据
 * @param fullPath - 该页签的路径
 */
export function getIndexInTabRoutes(tabs: App.Global.TabRoute[], fullPath: RouteRecordNameGeneric) {
  return tabs.findIndex(tab => tab.fullPath === fullPath)
}

/**
 * @description 判断该页签是否在多页签数据中
 * @param tabs - 多页签数据
 * @param fullPath - 该页签的路径
 */
export function isInTabRoutes(tabs: App.Global.TabRoute[], fullPath: RouteRecordNameGeneric) {
  return getIndexInTabRoutes(tabs, fullPath) > -1
}

/**
 * @description 根据路由名称获取该页签在多页签数据中的索引
 * @param tabs - 多页签数据
 * @param routeName - 路由名称
 */
export function getIndexInTabRoutesByRouteName(tabs: App.Global.TabRoute[], routeName: RouteRecordNameGeneric) {
  return tabs.findIndex(tab => tab.name === routeName)
}
/**
 * @description 获取缓存的多页签数据
 */
export function getTabRoutes() {
  const routes = []
  const data: App.Global.TabRoute[] = localStg.get('multiTabRoutes') || []
  if (data) {
    const defaultTabRoutes = data.map(item => ({
      ...item,
    }))
    routes.push(...defaultTabRoutes)
  }
  return routes
}

/**
 * @description 清空多页签数据
 */
export function clearTabRoutes() {
  localStg.set('multiTabRoutes', [])
}
