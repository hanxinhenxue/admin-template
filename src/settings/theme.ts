/**
 * @description naive-ui项目主题配置，如主色调等等
 */
export const themeSettings: App.Theme.ThemeSetting = {
  // 暗黑模式
  darkMode: false,
  // 灰色模式
  grayscale: false,
  // 色弱模式
  colourWeakness: false,
  // 主题色
  themeColor: '#646cff',
  // 主题色列表
  themeColorList: [
    '#1890ff',
    '#409EFF',
    '#007AFF',
    '#5ac8fa',
    '#5856D6',
    '#536dfe',
    '#646cff',
    '#9c27b0',
    '#AF52DE',
    '#0096c7',
    '#00C1D4',
    '#34C759',
    '#43a047',
    '#7cb342',
    '#c0ca33',
    '#78DEC7',
    '#e53935',
    '#d81b60',
    '#f4511e',
    '#fb8c00',
    '#ffb300',
    '#fdd835',
    '#6d4c41',
    '#546e7a',
  ],
  // 其他颜色
  otherColor: {
    info: '#2080f0',
    success: '#52c41a',
    warning: '#faad14',
    error: '#f5222d',
  },
  // 信息色是否跟随主色
  isInfoFollowPrimary: true,
  page: {
    // 页面切换动画
    animate: true,
    // 页面切换动画类型
    animateMode: 'fade-slide',
    // 页面切换动画类型枚举
    animateModeList: [
      {
        value: 'fade-slide',
        label: '滑动',
      },
      {
        value: 'fade',
        label: '消退',
      },
      {
        value: 'fade-bottom',
        label: '底部消退',
      },
      {
        value: 'fade-scale',
        label: '缩放消退',
      },
      {
        value: 'zoom-fade',
        label: '渐变',
      },
      {
        value: 'zoom-out',
        label: '闪现',
      },
    ],
  },
  header: {
    // 头部高度
    height: 56,
    // 面包屑配置
    breadcrumb: {
      // 面包屑是否显示
      visible: true,
      // 面包屑是否显示图标
      showIcon: true,
    },
  },
  tab: {
    // tab是否显示
    visible: true,
    // tab缓存
    cache: true,
    // tab高度
    height: 44,
    // tab风格
    mode: 'chrome',
    // 风格枚举
    modeList: [
      {
        value: 'chrome',
        label: '谷歌风格',
      },
      {
        value: 'button',
        label: '按钮风格',
      },
    ],
  },
  sider: {
    // 侧边栏深色
    inverted: false,
    // 侧边栏展开宽度
    width: 220,
    // 侧边栏收起宽度
    collapsedWidth: 64,
    // 混合模式下侧边栏宽度
    mixWidth: 90,
    // 混合模式下侧边栏收起宽度
    mixCollapsedWidth: 64,
    // 混合模式下子菜单宽度
    mixChildMenuWidth: 200,
  },
  footer: {
    // 底部是否显示
    visible: true,
    // 底部是否固定
    fixed: false,
    // 底部高度
    height: 48,
  },
  watermark: {
    // 水印是否显示
    visible: false,
    // 水印文字
    text: 'admin',
  },
  layout: {
    // 布局类型
    mode: 'horizontal-mix',
    // 布局类型枚举
    modeList: [
      {
        value: 'vertical',
        label: '左侧菜单模式',
      },
      {
        value: 'horizontal',
        label: '顶部菜单模式',
      },
      {
        value: 'vertical-mix',
        label: '左侧菜单混合模式',
      },
      {
        value: 'horizontal-mix',
        label: '顶部菜单混合模式',
      },
    ],
  },
}
