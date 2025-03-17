import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    /* 路由名称，可以用在页面title */
    title?: string
    /**
     * 路由权限，至少符合其中一个角色才能访问，不配置或者为空代表不需要权限即可访问
     */
    permissions?: string[]
    /** 是否缓存路由 */
    keepAlive?: boolean | null
    /**
     * 在线图标
     */
    icon?: string
    /**
     * 本地图标，比icon优先级高
     */
    localIcon?: string
    /** 图标尺寸，宽高相同，尽量使用长宽相等的图标 */
    iconFontSize?: number
    /**
     * 本地图片或者在线图片，高于localIcon和icon
     */
    image?: string
    /**
     * 菜图片样式
     */
    imageStyle?: Record<string, string>
    /** 排序，越小越靠前 */
    sort?: number | null
    /** 外链 */
    href?: string | null
    /**
     * 选中的路由，如详情页选中它的上级列表路径
     */
    activeMenu?: string | null
    /** 小红点或者文字 boolean默认小红点 */
    badge?: boolean | string
    path?: string
  }

  interface _RouteRecordBase {
    /** 是否在侧边栏隐藏 */
    hidden?: boolean | null
    /** 单个子菜单是否显示父菜单，默认子菜单覆盖父菜单，即不展示层级 */
    singleShow?: boolean | null
  }
  type AuthRoute = Omit<_RouteRecordBase, 'name' | 'path' | 'children'> & {
    name: string
    path: string
    component?: string
    children?: AuthRoute[]
  }
}
