import { localStg } from '@/utils'
import { useEventListener } from '@vueuse/core'
import { defineStore } from 'pinia'
import { darkTheme } from 'naive-ui'
import {
  getNaiveThemeOverrides, initThemeSettings, toggleCssDarkMode, toggleAuxiliaryColorModes
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

  function toggleDarkMode() {
    settings.value.darkMode = !settings.value.darkMode
  }

  function setDarkMode(mode: boolean) {
    settings.value.darkMode = mode
  }
  /** Reset store */
  function resetThemeStore() {
    const themeStore = useThemeStore()
    localStg.remove('themeSettings')
    themeStore.$reset()
  }

  function setPageIsAnimate(animate: boolean) {
    settings.value.page.animate = animate
  }

  function setPageAnimateMode(mode: string) {
    settings.value.page.animateMode = mode
  }

  function setSiderInverted(isInverted: boolean) {
    settings.value.sider.inverted = isInverted
  }

  /**
   * Set grayscale value
   *
   * @param isGrayscale
   */
  function setGrayscale(isGrayscale: boolean) {
    settings.value.grayscale = isGrayscale
  }

  /**
   * Set colourWeakness value
   *
   * @param isColourWeakness
   */
  function setColourWeakness(isColourWeakness: boolean) {
    settings.value.colourWeakness = isColourWeakness
  }

  /**
   * Set theme layout
   *
   * @param mode Theme layout mode
   */
  function setThemeColor(themeColor: string) {
    settings.value.themeColor = themeColor
  }

  function setHeaderCrumbBisible(visible: boolean) {
    settings.value.header.breadcrumb.visible = visible
  }

  function setHeaderCrumbIconVisible(showIcon: boolean) {
    settings.value.header.breadcrumb.showIcon = showIcon
  }

  function setTabVisible(visible: boolean) {
    settings.value.tab.visible = visible
  }

  function setTabMode(mode: string) {
    settings.value.tab.mode = mode
  }

  function setTabIsCache(cache: boolean) {
    settings.value.tab.cache = cache
  }

  function cacheThemeSettings() {
    const isProd = import.meta.env.PROD

    if (!isProd)
      return

    localStg.set('themeSettings', settings.value)
  }

  // cache theme settings when page is closed or refreshed
  useEventListener(window, 'beforeunload', () => {
    cacheThemeSettings()
  })

  // watch store
  scope.run(() => {
    // watch dark mode
    watch(
      darkMode,
      (val) => {
        toggleCssDarkMode(val)
      },
      { immediate: true },
    )

    watch(
      [grayscaleMode, colourWeaknessMode],
      (val) => {
        toggleAuxiliaryColorModes(val[0], val[1])
      },
      { immediate: true },
    )
  })

  /** On scope dispose */
  onScopeDispose(() => {
    scope.stop()
  })

  return {
    ...toRefs(settings.value),
    themeColors,
    naiveTheme,
    setGrayscale,
    setColourWeakness,
  }
})
