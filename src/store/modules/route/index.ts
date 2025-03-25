import type { MenuOption } from 'naive-ui'
import type { RouteMeta, RouteRecordNameGeneric, RouteRecordRaw } from 'vue-router'
import { useSvgIcon } from '@/hooks'
import asyncRoutes from '@/router/routes/async-routes'
import { CATCH_ROUTE, CONSTANT_ROUTES } from '@/router/routes/basic-routes'
import { useAppStore } from '@/store'
import { filterAsyncRoutes, getCacheRoutes, getConstantRouteNames, isExternal, renderExtra } from '@/utils'
import { defineStore } from 'pinia'

export const useRouteStore = defineStore('route-store', () => {
  const accessRoutes = shallowRef<RouteRecordRaw[]>([])
  const cacheRoutes = shallowRef<RouteRecordNameGeneric[]>([])

  const routes = computed(() => accessRoutes.value.concat(CONSTANT_ROUTES))

  const menus = computed(() => routes.value.filter((route: RouteRecordRaw) => route.name && !route.hidden))

  /**
   * @description 是否是有效的固定路由
   * @param name 路由名称
   */
  function isValidConstantRoute(name: string) {
    const NOT_FOUND_PAGE_NAME = CATCH_ROUTE.name
    const constantRouteNames = getConstantRouteNames(CONSTANT_ROUTES)
    return constantRouteNames.includes(name) && name !== NOT_FOUND_PAGE_NAME
  }
  /**
   * @description 根据角色生成路由
   * @param role 角色
   */
  function generateRoutes(role: string[]) {
    const filterAccessRoutes = filterAsyncRoutes(asyncRoutes, role)
    accessRoutes.value = filterAccessRoutes
    cacheRoutes.value = getCacheRoutes(filterAccessRoutes)
    return accessRoutes
  }
  /**
   * @description 重置路由
   */
  function resetPermission() {
    const routeStore = useRouteStore()
    routeStore.$reset()
  }

  /**
   * @description 移除缓存路由
   * @param routeName 路由名称
   */
  function removeCacheRoute(routeName: RouteRecordNameGeneric) {
    const index = cacheRoutes.value.findIndex(name => name === routeName)
    if (index !== -1) {
      cacheRoutes.value.splice(index, 1)
    }
  }

  /**
   * @description 添加缓存路由
   * @param routeName 路由名称
   */
  function addCacheRoute(routeName: RouteRecordNameGeneric) {
    const index = cacheRoutes.value.indexOf(routeName)
    if (index === -1) {
      cacheRoutes.value.push(routeName)
    }
  }

  /**
   * @description 刷新缓存路由
   * @param name 路由名称
   */
  async function reCacheRoute(name: RouteRecordNameGeneric) {
    const { reloadPage } = useAppStore()
    const isCached = cacheRoutes.value.includes(name)
    if (isCached) {
      removeCacheRoute(name)
      await reloadPage()
      addCacheRoute(name)
    }
  }
  /**
   * @description 获取菜单图标
   * @param meta 路由meta
   */
  function getIcon(meta: RouteMeta = {}) {
    const { icon, localIcon, image } = meta
    if (image) {
      return () => h('img', { src: image, style: meta?.imageStyle })
    }
    if (localIcon) {
      return useSvgIcon({ localIcon, ...meta })
    }
    if (icon) {
      return useSvgIcon({ icon, ...meta })
    }
  }

  /**
   * @description 拼接path
   * @param basePath 父级路径
   * @param path 子级路径
   */
  function resolvePath(basePath: string, path: string) {
    if (isExternal(path))
      return path
    return (
      `/${
        [basePath, path]
          .filter(path => !!path && path !== '/')
          .map(path => path.replace(/(^\/)|(\/$)/g, ''))
          .join('/')}`
    )
  }
  /**
   * @description 格式化菜单栏项
   * @param route 路由
   * @param basePath 路径
   */
  function getMenuItem(route: RouteRecordRaw, basePath = ''): App.Global.Menu {
    let menuItem: App.Global.Menu = {
      label: ((route.meta && route.meta.title) || route.name) as string,
      key: resolvePath(basePath, route.path) as string,
      icon: getIcon(route.meta),
      order: route.meta?.sort || 0,
      extra: renderExtra(route.meta),
    }

    const visibleChildren = route.children ? route.children.filter(item => item.name && !item.hidden) : []

    if (!visibleChildren.length)
      return menuItem
    if (visibleChildren.length === 1) {
      // 单个子路由处理
      const singleRoute = visibleChildren[0]
      if (route.singleShow) {
        const child = {
          label: (singleRoute.meta?.title || singleRoute.name) as string,
          key: resolvePath(menuItem.key, singleRoute.path),
          icon: getIcon(singleRoute.meta),
        }
        menuItem.children = [child]
      }
      else {
        menuItem = {
          ...menuItem,
          label: (singleRoute.meta?.title || singleRoute.name) as string,
          key: resolvePath(menuItem.key, singleRoute.path),
          icon: getIcon(singleRoute.meta),
        }
      }
      const visibleItems = singleRoute.children ? singleRoute.children.filter(item => item.name && !item.hidden) : []
      if (visibleItems.length === 1) {
        menuItem = getMenuItem(visibleItems[0], menuItem.key)
      }
      else if (visibleItems.length > 1) {
        menuItem.children = visibleItems.map(item => getMenuItem(item, menuItem.key)).sort((a, b) => a.order - b.order)
      }
    }
    else {
      menuItem.children = visibleChildren.map(item => getMenuItem(item, menuItem.key)).sort((a, b) => a.order - b.order)
    }
    return menuItem
  }

  const menuOptions = computed<MenuOption[]>(() => {
    return menus.value.map(item => getMenuItem(item)).sort((a, b) => a.order! - b.order!) as unknown as MenuOption[]
  })

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
    menuOptions,
  }
})
