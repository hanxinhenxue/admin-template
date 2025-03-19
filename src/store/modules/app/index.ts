import { useBoolean } from '@/hooks'
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import { defineStore } from 'pinia'
import { useThemeStore } from '../theme'

export const useAppStore = defineStore('app-store', () => {
  const themeStore = useThemeStore()
  const { bool: reloadFlag, setBool: setReloadFlag } = useBoolean(true)
  const { bool: drawerVisible, setBool: setDrawerVisible, toggle: toggleDrawerVisible } = useBoolean(false)
  const { bool: siderCollapse, setBool: setSiderCollapse, toggle: toggleSiderCollapse } = useBoolean(true)
  const { bool: fullContent, toggle: toggleFullContent } = useBoolean()
  const { bool: contentXScrollable, setBool: setContentXScrollable } = useBoolean()
  const breakpoints = useBreakpoints(breakpointsTailwind)
  const isMobile = breakpoints.smaller('sm')
  const scope = effectScope()
  /**
   * 刷新内容
   * @param duration 过渡时间，毫秒
   */
  async function reloadPage(duration = 300) {
    setReloadFlag(false)

    const d = themeStore.page.animate ? duration : 40

    await new Promise((resolve) => {
      setTimeout(resolve, d)
    })

    setReloadFlag(true)

    document.documentElement.scrollTo({ left: 0, top: 0 })
  }

  scope.run(() => {
    // 如果是手机，默认折叠侧边栏
    watch(
      isMobile,
      (newValue) => {
        if (newValue) {
          setSiderCollapse(true)
        }
      },
      { immediate: true },
    )
  })

  onScopeDispose(() => {
    scope.stop()
  })

  return {
    fullContent,
    toggleFullContent,
    contentXScrollable,
    setContentXScrollable,
    reloadFlag,
    setReloadFlag,
    reloadPage,
    drawerVisible,
    setDrawerVisible,
    toggleDrawerVisible,
    siderCollapse,
    setSiderCollapse,
    toggleSiderCollapse,
    isMobile,
  }
})
