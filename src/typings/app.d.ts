/** 系统配置 */
declare namespace App {
  /** 主题 命名空间 */
  namespace Theme {
    type ColorPaletteNumber = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950

    type ThemeScheme = 'dark' | 'light' | 'auto'

    type ThemeLayoutMode = 'vertical' | 'horizontal' | 'vertical-mix' | 'horizontal-mix'

    /** 主题设置 */
    interface ThemeSetting {
    /** 主题模式 */
      themeScheme: ThemeScheme
      /** 灰色模式 */
      grayscale: boolean
      /** 视弱模式 */
      colourWeakness: boolean
      /** 推荐颜色 */
      recommendColor: boolean
      /** 主题色 */
      themeColor: string
      /** 其他颜色 */
      otherColor: OtherColor
      /** info颜色是否和主题色相同 */
      isInfoFollowPrimary: boolean
      /** 重置缓存策略 close 关闭页面 refresh 刷新页面 */
      resetCacheStrategy: 'close' | 'refresh'
      /** 页面布局 */
      layout: {
      /** 布局模式 */
        mode: ThemeLayoutMode
        /** 滚动模式 */
        scrollMode: 'wrapper' | 'content'
        /* 是否反转一级菜单与子级菜单位置 */
        reverseHorizontalMix: boolean
      }
      /** 页面 */
      page: {
      /** 页面切换动画 */
        animate: boolean
        /** 动画模式 fade-slide 滑动 ... */
        animateMode: string
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
        mode: 'button' | 'chrome'
      }
      /** 固定头部和标签栏 */
      fixedHeaderAndTab: boolean
      /** 侧边栏 */
      sider: {
      /** 深色侧边栏 */
        inverted: boolean
        /** 侧边栏宽度 */
        width: number
        /** 侧边栏折叠宽度 */
        collapsedWidth: number
        /** 混合布局侧边栏宽度 'vertical-mix' or 'horizontal-mix' */
        mixWidth: number
        /** 混合布局侧边栏折叠宽度 'vertical-mix' or 'horizontal-mix' */
        mixCollapsedWidth: number
        /** 混合布局子菜单宽度 'vertical-mix' or 'horizontal-mix' */
        mixChildMenuWidth: number
      }
      /** 页脚 */
      footer: {
      /** 是否显示页脚 */
        visible: boolean
        /** 页脚固定 */
        fixed: boolean
        /** 页脚高度 */
        height: number
        /** 底部局右 'horizontal-mix' */
        right: boolean
      }
      /** 水印 */
      watermark: {
      /** 是否显示水印 */
        visible: boolean
        /** 水印文字 */
        text: string
      }
      /** define some theme settings tokens, will transform to css variables */
      tokens: {
        light: ThemeSettingToken
        dark?: {
          [K in keyof ThemeSettingToken]?: Partial<ThemeSettingToken[K]>;
        }
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
    interface Menu {
      /**
       * 菜单key等于route key
       */
      key: string
      /** 菜单名字 */
      label: string
      /** 完整的路由 */
      routeKey: string | symbol | undefined
      /** 路由路径 */
      routePath: string | symbol | undefined
      /** 图标 */
      icon?: () => VNode
      /** 子菜单 */
      children?: Menu[]
    }

    type Breadcrumb = Omit<Menu, 'children'> & {
      options?: Breadcrumb[]
    }

    interface Tab {
      /** The tab id */
      id: string
      /** The tab label */
      label: string
      /**
       * The new tab label
       *
       * If set, the tab label will be replaced by this value
       */
      newLabel?: string
      /**
       * The old tab label
       *
       * when reset the tab label, the tab label will be replaced by this value
       */
      oldLabel?: string
      /** The tab route key */
      routeKey: string
      /** The tab route path */
      routePath: string
      /** The tab route full path */
      fullPath: string
      /** The tab fixed index */
      fixedIndex?: number | null
      /**
       * Tab icon
       *
       * Iconify icon
       */
      icon?: string
      /**
       * Tab local icon
       *
       * Local icon
       */
      localIcon?: string
    }
  }

}
