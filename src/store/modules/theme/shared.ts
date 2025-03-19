import type { GlobalThemeOverrides } from 'naive-ui'
import { themeSettings } from '@/settings'
import { addColorAlpha, getColorPalette, localStg, toggleHtmlClass } from '@/utils'
import { defu } from 'defu'

/**
 * @description 初始化主题设置
 */
export function initThemeSettings() {
  const isProd = import.meta.env.PROD

  // 开发模式直接在settings/theme修改配置
  if (!isProd)
    return themeSettings

  const localSettings: App.Theme.ThemeSetting | null = localStg.get('themeSettings')

  const settings = defu(localSettings, themeSettings)

  return settings
}
type NaiveColorScene = '' | 'Suppl' | 'Hover' | 'Pressed' | 'Active'
type NaiveColorKey = `${App.Theme.ThemeColorKey}Color${NaiveColorScene}`
type NaiveThemeColor = Partial<Record<NaiveColorKey, string>>
interface NaiveColorAction {
  scene: NaiveColorScene
  handler: (color: string) => string
}
/**
 * @description 获取naive主题颜色
 * @param colors 主题色
 */
function getNaiveThemeColors(colors: App.Theme.ThemeColor) {
  const colorActions: NaiveColorAction[] = [
    { scene: '', handler: color => color },
    { scene: 'Suppl', handler: color => color },
    { scene: 'Hover', handler: color => getColorPalette(color, 5) },
    { scene: 'Pressed', handler: color => getColorPalette(color, 7) },
    { scene: 'Active', handler: color => addColorAlpha(color, 0.1) },
  ]

  const themeColors: NaiveThemeColor = {}

  const colorEntries = Object.entries(colors) as [App.Theme.ThemeColorKey, string][]

  colorEntries.forEach((color) => {
    colorActions.forEach((action) => {
      const [colorType, colorValue] = color
      const colorKey: NaiveColorKey = `${colorType}Color${action.scene}`
      themeColors[colorKey] = action.handler(colorValue)
    })
  })

  return themeColors
}

/**
 * @description 获取naive主题配置
 * @param colors 主题色
 */
export function getNaiveThemeOverrides(colors: App.Theme.ThemeColor) {
  const { primary: colorLoading } = colors

  const theme: GlobalThemeOverrides = {
    common: {
      ...getNaiveThemeColors(colors),
    },
    LoadingBar: {
      colorLoading,
    },
  }

  return theme
}

/**
 * @description 切换css暗黑模式
 * @param darkMode 是否是暗黑模式
 */
export function toggleCssDarkMode(darkMode = false) {
  const { add, remove } = toggleHtmlClass('dark')

  if (darkMode) {
    add()
  }
  else {
    remove()
  }
}

/**
 * @description 切换css色弱、灰色模式
 * @param grayscaleMode 是否是灰色模式
 * @param colourWeakness 是否是色弱模式
 */
export function toggleAuxiliaryColorModes(grayscaleMode = false, colourWeakness = false) {
  const htmlElement = document.documentElement
  htmlElement.style.filter = [grayscaleMode ? 'grayscale(100%)' : '', colourWeakness ? 'invert(80%)' : '']
    .filter(Boolean)
    .join(' ')
}
