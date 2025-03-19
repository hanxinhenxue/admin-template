import { localStg } from '@/utils'
import { useEventListener } from '@vueuse/core'
import { darkTheme } from 'naive-ui'
import { defineStore } from 'pinia'
import {
  getNaiveThemeOverrides,
  initThemeSettings,
  toggleAuxiliaryColorModes,
  toggleCssDarkMode,
} from './shared'

/** Theme store */
export const useThemeStore = defineStore('theme-store', () => {
  const scope = effectScope()

  /** Theme settings */
  const settings: Ref<App.Theme.ThemeSetting> = ref(initThemeSettings())

  const themeColors = computed(() => {
    const { themeColor, otherColor, isInfoFollowPrimary } = settings.value
    const colors: App.Theme.ThemeColor = {
      primary: themeColor,
      ...otherColor,
      info: isInfoFollowPrimary ? themeColor : otherColor.info,
    }
    return colors
  })

  const darkMode = computed(() => settings.value.darkMode)

  const grayscaleMode = computed(() => settings.value.grayscale)

  const colourWeaknessMode = computed(() => settings.value.colourWeakness)

  const naiveThemeOverrides = computed(() => getNaiveThemeOverrides(themeColors.value))

  const naiveTheme = computed(() => settings.value.darkMode ? darkTheme : undefined)

  const pageAnimateMode = computed(() => settings.value.page.animate ? settings.value.page.animateMode : '')

  /**
   * @description 切换暗黑模式
   */
  function toggleDarkMode() {
    settings.value.darkMode = !settings.value.darkMode
  }

  /**
   * @description 设置暗黑模式
   * @param mode 暗黑模式
   */
  function setDarkMode(mode: boolean) {
    settings.value.darkMode = mode
  }
  /**
   * @description 重置主题设置
   */
  function resetThemeStore() {
    const themeStore = useThemeStore()
    localStg.remove('themeSettings')
    themeStore.$reset()
  }
  /**
   * @description 设置是否使用页面切换动画
   * @param animate 是否使用页面切换动画
   */
  function setPageIsAnimate(animate: boolean) {
    settings.value.page.animate = animate
  }
  /**
   * @description 设置页面切换动画
   * @param mode 页面切换动画
   */
  function setPageAnimateMode(mode: string) {
    settings.value.page.animateMode = mode
  }
  /**
   * @description 设置侧边栏深色
   * @param isInverted 是否深色
   */
  function setSiderInverted(isInverted: boolean) {
    settings.value.sider.inverted = isInverted
  }

  /**
   * @description 设置灰色模式
   * @param isGrayscale 是否灰色
   */
  function setGrayscale(isGrayscale: boolean) {
    settings.value.grayscale = isGrayscale
  }
  /**
   * @description 设置色弱模式
   * @param isColourWeakness 是否色弱
   */
  function setColourWeakness(isColourWeakness: boolean) {
    settings.value.colourWeakness = isColourWeakness
  }

  /**
   * @description 设置主题色
   * @param themeColor 主题色
   */
  function setThemeColor(themeColor: string) {
    settings.value.themeColor = themeColor
  }

  /**
   * @description 设置面包屑是否可见
   * @param visible 是否可见
   */
  function setHeaderCrumbBisible(visible: boolean) {
    settings.value.header.breadcrumb.visible = visible
  }

  /**
   * @description 设置面包屑图标是否可见
   * @param showIcon 是否可见
   */
  function setHeaderCrumbIconVisible(showIcon: boolean) {
    settings.value.header.breadcrumb.showIcon = showIcon
  }

  /**
   * @description 设置页签是否可见
   * @param visible 是否可见
   */
  function setTabVisible(visible: boolean) {
    settings.value.tab.visible = visible
  }

  /**
   * @description 设置页签类型
   * @param mode 页签类型
   */
  function setTabMode(mode: string) {
    settings.value.tab.mode = mode
  }

  /**
   * @description 设置页签是否缓存
   * @param cache 是否缓存
   */
  function setTabIsCache(cache: boolean) {
    settings.value.tab.cache = cache
  }

  /**
   * @description 缓存主题模式
   */
  function cacheThemeSettings() {
    const isProd = import.meta.env.PROD

    if (!isProd)
      return

    localStg.set('themeSettings', settings.value)
  }

  /**
   * @description 缓存主题模式
   */
  useEventListener(window, 'beforeunload', () => {
    cacheThemeSettings()
  })

  scope.run(() => {
    /**
     * @description 监听 暗黑模式
     */
    watch(
      darkMode,
      (val) => {
        toggleCssDarkMode(val)
      },
      { immediate: true },
    )

    /**
     * @description 监听 色弱和灰色模式
     */
    watch(
      [grayscaleMode, colourWeaknessMode],
      (val) => {
        toggleAuxiliaryColorModes(val[0], val[1])
      },
      { immediate: true },
    )
  })

  onScopeDispose(() => {
    scope.stop()
  })

  return {
    ...toRefs(settings.value),
    themeColors,
    naiveTheme,
    setGrayscale,
    setColourWeakness,
    toggleDarkMode,
    naiveThemeOverrides,
    pageAnimateMode,
    setDarkMode,
    resetThemeStore,
    setPageIsAnimate,
    setPageAnimateMode,
    setSiderInverted,
    setThemeColor,
    setHeaderCrumbBisible,
    setHeaderCrumbIconVisible,
    setTabVisible,
    setTabMode,
    setTabIsCache,
  }
})
