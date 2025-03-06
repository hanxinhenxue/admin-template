import type { GlobalThemeOverrides } from 'naive-ui'
import { themeSettings, themeVars } from '@/settings'
import { addColorAlpha, getColorPalette, getPaletteColorByNumber, getRgb, localStg, toggleHtmlClass } from '@/utils'
import { defu } from 'defu'

const DARK_CLASS = 'dark'
/**
 * 初始化 主题设置
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

/**
 * 创建主题色变量下的自定义样式
 *
 * @param colors 主题颜色
 * @param tokens 主题设置里面的颜色
 * @param [recommended] 是否使用推荐颜色默认 `false`
 */
export function createThemeToken(
  colors: App.Theme.ThemeColor,
  tokens?: App.Theme.ThemeSetting['tokens'],
  recommended = false,
) {
  const paletteColors = createThemePaletteColors(colors, recommended)

  const { light, dark } = tokens || themeSettings.tokens

  const themeTokens: App.Theme.BaseToken = {
    colors: {
      ...paletteColors,
      nprogress: paletteColors.primary,
      ...light.colors,
    },
    boxShadow: {
      ...light.boxShadow,
    },
  }

  const darkThemeTokens: App.Theme.BaseToken = {
    colors: {
      ...themeTokens.colors,
      ...dark?.colors,
    },
    boxShadow: {
      ...themeTokens.boxShadow,
      ...dark?.boxShadow,
    },
  }

  return {
    themeTokens,
    darkThemeTokens,
  }
}

/**
 * 主题色调色
 *
 * @param colors 主题色
 * @param [recommended] 是否使用推荐颜色默认 `false`
 */
function createThemePaletteColors(colors: App.Theme.ThemeColor, recommended = false) {
  const colorKeys = Object.keys(colors) as App.Theme.ThemeColorKey[]
  const colorPaletteVar = {} as App.Theme.ThemePaletteColor

  colorKeys.forEach((key) => {
    const colorMap = getColorPalette(colors[key], recommended)

    colorPaletteVar[key] = colorMap.get(500)!

    colorMap.forEach((hex, number) => {
      colorPaletteVar[`${key}-${number}`] = hex
    })
  })

  return colorPaletteVar
}

/**
 * Get css var by tokens
 *
 * @param tokens Theme base tokens
 */
function getCssVarByTokens(tokens: App.Theme.BaseToken) {
  const styles: string[] = []

  function removeVarPrefix(value: string) {
    return value.replace('var(', '').replace(')', '')
  }

  function removeRgbPrefix(value: string) {
    return value.replace('rgb(', '').replace(')', '')
  }

  for (const [key, tokenValues] of Object.entries(themeVars)) {
    for (const [tokenKey, tokenValue] of Object.entries(tokenValues)) {
      let cssVarsKey = removeVarPrefix(tokenValue as string)
      let cssValue = tokens[key][tokenKey]

      if (key === 'colors') {
        cssVarsKey = removeRgbPrefix(cssVarsKey)
        const { r, g, b } = getRgb(cssValue)
        cssValue = `${r} ${g} ${b}`
      }

      styles.push(`${cssVarsKey}: ${cssValue}`)
    }
  }

  const styleStr = styles.join(';')

  return styleStr
}

/**
 * Add theme vars to global
 *
 * @param tokens
 */
export function addThemeVarsToGlobal(tokens: App.Theme.BaseToken, darkTokens: App.Theme.BaseToken) {
  const cssVarStr = getCssVarByTokens(tokens)
  const darkCssVarStr = getCssVarByTokens(darkTokens)

  const css = `
    :root {
      ${cssVarStr}
    }
  `

  const darkCss = `
    html.${DARK_CLASS} {
      ${darkCssVarStr}
    }
  `

  const styleId = 'theme-vars'

  const style = document.querySelector(`#${styleId}`) || document.createElement('style')

  style.id = styleId

  style.textContent = css + darkCss

  document.head.appendChild(style)
}

/**
 * Toggle css dark mode
 *
 * @param darkMode Is dark mode
 */
export function toggleCssDarkMode(darkMode = false) {
  const { add, remove } = toggleHtmlClass(DARK_CLASS)

  if (darkMode) {
    add()
  }
  else {
    remove()
  }
}

/**
 * Toggle auxiliary color modes
 *
 * @param grayscaleMode
 * @param colourWeakness
 */
export function toggleAuxiliaryColorModes(grayscaleMode = false, colourWeakness = false) {
  const htmlElement = document.documentElement
  htmlElement.style.filter = [grayscaleMode ? 'grayscale(100%)' : '', colourWeakness ? 'invert(80%)' : '']
    .filter(Boolean)
    .join(' ')
}

type NaiveColorScene = '' | 'Suppl' | 'Hover' | 'Pressed' | 'Active'
type NaiveColorKey = `${App.Theme.ThemeColorKey}Color${NaiveColorScene}`
type NaiveThemeColor = Partial<Record<NaiveColorKey, string>>
interface NaiveColorAction {
  scene: NaiveColorScene
  handler: (color: string) => string
}

/**
 * Get naive theme colors
 *
 * @param colors Theme colors
 * @param [recommended] Use recommended color. Default is `false`
 */
function getNaiveThemeColors(colors: App.Theme.ThemeColor, recommended = false) {
  const colorActions: NaiveColorAction[] = [
    { scene: '', handler: color => color },
    { scene: 'Suppl', handler: color => color },
    { scene: 'Hover', handler: color => getPaletteColorByNumber(color, 500, recommended) },
    { scene: 'Pressed', handler: color => getPaletteColorByNumber(color, 700, recommended) },
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
 * Get naive theme
 *
 * @param colors Theme colors
 * @param [recommended] Use recommended color. Default is `false`
 */
export function getNaiveTheme(colors: App.Theme.ThemeColor, recommended = false) {
  const { primary: colorLoading } = colors

  const theme: GlobalThemeOverrides = {
    common: {
      ...getNaiveThemeColors(colors, recommended),
      borderRadius: '6px',
    },
    LoadingBar: {
      colorLoading,
    },
    Tag: {
      borderRadius: '6px',
    },
  }

  return theme
}
