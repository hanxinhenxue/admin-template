import { router } from '@/router'
import { useRouteStore, useThemeStore } from '@/store'
import { localStg } from '@/utils'
import { useEventListener } from '@vueuse/core'
import { defineStore } from 'pinia'
import { clearTabRoutes, getIndexInTabRoutes, getIndexInTabRoutesByRouteName, getTabRouteByVueRoute, getTabRoutes, isInTabRoutes } from './shared'

export const useTabStore = defineStore('tab', () => {
  const tabs = shallowRef<App.Global.TabRoute[]>([])
  const activeTab = ref<string>()
  const theme = useThemeStore()

  const activeTabIndex = computed(() => tabs.value.findIndex(tab => tab.fullPath === activeTab.value))
  /**
   * @description 重置tabStore
   */
  function resetTabStore() {
    const tabStore = useTabStore()
    clearTabRoutes()
    tabStore.$reset()
  }
  /**
   * @description 缓存tabStore
   */
  function cacheTabRoutes() {
    if (!theme.tab.cache)
      return
    localStg.set('multiTabRoutes', tabs.value)
  }
  /**
   * @description 设置当前激活的tab
   * @param fullPath - 路由fullPath
   */
  function setActiveTab(fullPath: string) {
    activeTab.value = fullPath
  }
  /**
   * @description 设置当前激活的tab的title
   * @param title - tab的title
   */
  function setActiveTabTitle(title: string) {
    const item = tabs.value.find(tab => tab.fullPath === activeTab.value)
    if (item) {
      item.meta.title = title
    }
  }
  /**
   * @description 添加tab
   * @param route - 路由
   */
  function addTab(route: App.Global.TabRoute) {
    const tab = getTabRouteByVueRoute(route)
    if (!isInTabRoutes(tabs.value, tab.fullPath)) {
      const index = getIndexInTabRoutesByRouteName(tabs.value, route.name)
      if (index === -1) {
        return tabs.value.push(tab)
      }
    }
  }
  /**
   * @description 删除多页签
   * @param fullPath - 路由fullPath
   */
  async function removeTab(fullPath: string) {
    const { reCacheRoute } = useRouteStore()

    const tabName = tabs.value.find(tab => tab.fullPath === fullPath)?.name
    if (tabName) {
      await reCacheRoute(tabName)
    }

    const isActive = activeTab.value === fullPath
    const updateTabs = tabs.value.filter(tab => tab.fullPath !== fullPath)
    if (!isActive) {
      tabs.value = updateTabs
    }
    if (isActive && updateTabs.length) {
      const activePath = updateTabs[updateTabs.length - 1].fullPath
      router.push(activePath!)
      tabs.value = updateTabs
      setActiveTab(activePath!)
    }
  }
  /**
   * @description 清空多页签，保留选中的tabs和当前激活的tab
   * @param excludes - 保留的多页签path
   */
  async function clearTab(excludes: string[] = []) {
    const remainPath = [activeTab.value, ...excludes]
    const remainTabs = tabs.value.filter((tab: App.Global.TabRoute) => remainPath.includes(tab.fullPath!))
    tabs.value = remainTabs
  }
  /**
   * @description 清除左边多页签
   * @param fullPath - 路由fullPath
   */
  function clearLeftTab(fullPath: string) {
    const index = getIndexInTabRoutes(tabs.value, fullPath)
    if (index > -1) {
      const excludes: string[] = tabs.value.slice(index).map(item => item.fullPath!)
      clearTab(excludes)
    }
  }
  /**
   * @description 清除右边多页签
   * @param fullPath - 路由fullPath
   */
  function clearRightTab(fullPath: string) {
    const index = getIndexInTabRoutes(tabs.value, fullPath)
    if (index > -1) {
      const excludes = tabs.value.slice(0, index + 1).map(item => item.fullPath!)
      clearTab(excludes)
    }
  }
  /**
   * @description 清除所有多页签
   */
  function clearAllTab() {
    clearTab()
  }
  /**
   * @description 点击单个tab
   * @param fullPath - 路由fullPath
   */
  async function handleClickTab(fullPath: string) {
    const isActive = activeTab.value === fullPath
    if (!isActive) {
      router.push(fullPath)
      setActiveTab(fullPath)
    }
  }
  /**
   * @description 初始化tabStore
   * @param currentRoute - 路由
   */
  function iniTabStore(currentRoute: App.Global.TabRoute) {
    const defaultTabs = theme.tab.cache ? getTabRoutes() : []

    const index = getIndexInTabRoutesByRouteName(defaultTabs, currentRoute.name)
    const currentTab = getTabRouteByVueRoute(currentRoute)
    if (index > -1) {
      defaultTabs.splice(index, 1, currentTab)
    }
    else {
      defaultTabs.push(currentTab)
    }

    tabs.value = defaultTabs
    setActiveTab(currentRoute.fullPath!)
  }

  /**
   * @description 缓存页签逻辑
   */
  useEventListener(window, 'beforeunload', () => {
    cacheTabRoutes()
  })
  return {
    tabs,
    activeTab,
    activeTabIndex,
    resetTabStore,
    cacheTabRoutes,
    setActiveTab,
    setActiveTabTitle,
    addTab,
    iniTabStore,
    handleClickTab,
    removeTab,
    clearAllTab,
    clearRightTab,
    clearLeftTab,
    clearTab,
  }
}, {
  persist: {
    pick: ['tabs'],
    storage: sessionStorage,
  },
})
