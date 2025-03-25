import { localStg } from '@/utils'
import { useEventListener } from '@vueuse/core'
import { kebabCase } from 'lodash-es'
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

  const isDark = computed(() => settings.value.darkMode)

  const grayscaleMode = computed(() => settings.value.grayscale)

  const colourWeaknessMode = computed(() => settings.value.colourWeakness)

  const naiveThemeOverrides = computed(() => getNaiveThemeOverrides(themeColors.value))

  const naiveTheme = computed(() => settings.value.darkMode ? darkTheme : undefined)

  const pageAnimateMode = computed(() => settings.value.page.animate ? settings.value.page.animateMode : '')

  const settingsJson = computed(() => JSON.stringify(settings.value))

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
   * @description 设置主色
   * @param themeColor 主题色
   */
  function setThemeColor(themeColor: string) {
    settings.value.themeColor = themeColor
  }
  /**
   * @description 设置其他
   * @param key 其他颜色key
   * @param themeColor 主题色
   */
  function setOtherColor(key: 'info' | 'success' | 'warning' | 'error', themeColor: string) {
    settings.value.otherColor[key] = themeColor
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
      isDark,
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
    /**
     * @description 监听 主色变化
     */
    watch(
      themeColors,
      (val) => {
        localStg.set('themeColor', val.primary)
      },
      { immediate: true },
    )
    /**
     * @description 监听 主题变化
     */
    watch(
      naiveThemeOverrides,
      (val) => {
        const themeVars = val.common as Record<string, string>
        const keys = Object.keys(themeVars)
        const style: string[] = []
        keys.forEach((key) => {
          const color = themeVars[key]

          if (color) {
            style.push(`--${kebabCase(key)}: ${color}`)
          }
        })
        const styleStr = style.join(';')
        document.documentElement.style.cssText += styleStr
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
    toggleDarkMode,
    naiveThemeOverrides,
    pageAnimateMode,
    setDarkMode,
    resetThemeStore,
    setOtherColor,
    setThemeColor,
    settingsJson,
  }
})
