/** 系统配置 */
declare namespace App {
  /** 主题 命名空间 */
  namespace Theme {
    type ColorPaletteNumber = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950

    type ThemeLayoutMode = 'vertical' | 'horizontal' | 'vertical-mix' | 'horizontal-mix'

    /** 主题设置 */
    interface ThemeSetting {
    /** 暗黑模式 */
      darkMode: boolean
      /** 灰色模式 */
      grayscale: boolean
      /** 视弱模式 */
      colourWeakness: boolean
      /** 主题色 */
      themeColor: string
      /** 主题色列表 */
      themeColorList: string[]
      /** 其他颜色 */
      otherColor: OtherColor
      /** info颜色是否和主题色相同 */
      isInfoFollowPrimary: boolean
      /** 页面 */
      page: {
      /** 页面切换动画 */
        animate: boolean
        /** 动画模式 fade-slide 滑动 ... */
        animateMode: string
        /** 页面切换动画类型枚举 */
        animateModeList: Record<string, string>[]
      }
      /** 头部 */
      header: {
        /** 头部高度 */
        height: number
        /** 面包屑 */
        breadcrumb: {
        /** 面包屑是否显示 */
          visible: boolean
          /** 是否显示面包屑图标 */
          showIcon: boolean
        }
      }
      /** 页签 */
      tab: {
      /** 是否显示页签 */
        visible: boolean
        /** 页签记录是否缓存 */
        cache: boolean
        /** 页签高度 */
        height: number
        /** 页签模式 */
        mode: string
        /** 页签模式列表 */
        modeList: Record<string, string>[]
      }
      /** 侧边栏 */
      sider: {
      /** 深色侧边栏 */
        inverted: boolean
        /** 侧边栏宽度 */
        width: number
        /** 侧边栏折叠宽度 */
        collapsedWidth: number
      }
      /** 页脚 */
      footer: {
      /** 是否显示页脚 */
        visible: boolean
        /** 页脚固定 */
        fixed: boolean
        /** 页脚高度 */
        height: number
      }
      /** 水印 */
      watermark: {
      /** 是否显示水印 */
        visible: boolean
        /** 水印文字 */
        text: string
      }
      /** 布局 */
      layout: {
        /** 布局模式 ... */
        mode: string
        /** 布局模式类型枚举 */
        modeList: Record<string, string>[]
      }
    }

    interface OtherColor {
      info: string
      success: string
      warning: string
      error: string
    }

    interface ThemeColor extends OtherColor {
      primary: string
    }

    type ThemeColorKey = keyof ThemeColor

    type ThemePaletteColor = {
      [key in ThemeColorKey | `${ThemeColorKey}-${ColorPaletteNumber}`]: string;
    }

    type BaseToken = Record<string, Record<string, string>>

    interface ThemeSettingTokenColor {
      /** the progress bar color, if not set, will use the primary color */
      'nprogress'?: string
      'container': string
      'layout': string
      'inverted': string
      'base-text': string
    }

    interface ThemeSettingTokenBoxShadow {
      header: string
      sider: string
      tab: string
    }

    interface ThemeSettingToken {
      colors: ThemeSettingTokenColor
      boxShadow: ThemeSettingTokenBoxShadow
    }

    type ThemeTokenColor = ThemePaletteColor & ThemeSettingTokenColor

    /** Theme token CSS variables */
    interface ThemeTokenCSSVars {
      colors: ThemeTokenColor & { [key: string]: string }
      boxShadow: ThemeSettingTokenBoxShadow & { [key: string]: string }
    }
  }

  namespace Global {
    type RouteLocationNormalizedLoaded = import('vue-router').RouteLocationNormalizedLoaded
    type RouteLocationAsRelativeGeneric = import('vue-router').RouteLocationAsRelativeGeneric
    type MenuOption = import('naive-ui').MenuOption
    type Menu = MenuOption & {
      order: number
      key: string
    }

    type Breadcrumb = Omit<Menu, 'children'> & {
      options?: Breadcrumb[]
    }
    type TabRoute = Pick<RouteLocationNormalizedLoaded, 'name' | 'path' | 'meta'> &
      Partial<Pick<RouteLocationNormalizedLoaded, 'fullPath' | 'query' | 'matched'>>
    interface Tab {
      /** The tab id */
      name: string | symbol | undefined
      fullPath: string
      path?: string
      meta: {
        title?: string
        icon?: string
        localIcon?: string
        iconFontSize?: number
        image?: string
        imageStyle?: Record<string, string>
        sort?: number | null
        href?: string | null
        activeMenu?: string | null
        badge?: boolean | string
      }
    }
  }

}
