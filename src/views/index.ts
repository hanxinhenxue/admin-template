import type { RouteRecordRaw } from 'vue-router'
/**
 * @description 权限路由
 */
import BaseLayout from '@/layouts/base-layout/index.vue'
/**
 * @param hidden 是否在侧边栏隐藏
 * @param singleShow 单个孩子是否显示父组件
 * @param name 路由名称, 必须设置,且不能重名
 * @param meta 路由元信息（路由附带扩展信息）
 * @param redirect 重定向地址, 访问这个路由时,自定进行重定向
 * @param meta.title 菜单名称，配置了就会显示面包屑
 * @param meta.icon 菜单在线图标
 * @param meta.localIcon 菜单本地svg图标
 * @param meta.iconFontSize 图标尺寸，尽量选等比例图标
 * @param meta.image 菜单本地图片
 * @param meta.imageStyle 菜单本地图片宽高等属性
 * @param meta.keepAlive 缓存该路由 name要和组件名相同
 * @param meta.sort 排序越小越排前
 * @param meta.permissions 需要权限才能访问
 * @param meta.activeMenu 不在侧边栏但是需要做侧边栏选中的按钮，如表格详情，选择name
 * @param meta.badge 菜单栏额外角标，true 小红点 | 单个文字
 *
 */
const routes: RouteRecordRaw[] = [
  {
    name: 'DashboardParent',
    path: '/dashboard',
    component: BaseLayout,
    redirect: '/dashboard/analysis',
    meta: {
      sort: 0,
      title: '仪表盘',
      icon: 'mdi:monitor-dashboard',
    },
    children: [
      {
        name: 'Analysis',
        path: 'analysis',
        component: () => import('@/views/dashboard/analysis/index.vue'),
        meta: {
          title: '分析页',
          icon: 'icon-park-outline:analysis',
          keepAlive: true,
        },
      },
      {
        name: 'Workbench',
        path: 'workbench',
        component: () => import('@/views/dashboard/workbench/index.vue'),
        meta: {
          title: '工作台',
          icon: 'icon-park-outline:workbench',
          keepAlive: true,
        },
      },
    ],
  },
  {
    name: 'ToolsParent',
    path: '/tools',
    component: BaseLayout,
    redirect: '/tools/triangle-generator',
    meta: {
      sort: 1,
      title: '常用工具',
      localIcon: 'tool',
      iconFontSize: 20,
    },
    children: [
      {
        name: 'TriangleGenerator',
        path: 'triangle-generator',
        component: () => import('@/views/tools/triangle-generator/index.vue'),
        meta: {
          title: '三角形生成器',
          icon: 'ph:triangle-fill',
          keepAlive: true,
          badge: true,
        },
      },
      {
        name: 'ShadowGenerator',
        path: 'shadow-generator',
        redirect: '/tools/shadow-generator/box-shadow',
        meta: {
          title: '阴影生成器',
          icon: 'material-symbols:ev-shadow-outline',
          badge: '新',
        },
        children: [
          {
            name: 'BoxShadow',
            path: 'box-shadow',
            component: () => import('@/views/tools/shadow-generator/box-shadow/index.vue'),
            meta: {
              title: 'box-shadow',
              icon: 'mdi:box-shadow',
              keepAlive: true,
            },
          },
          {
            name: 'TextShadow',
            path: 'text-shadow',
            component: () => import('@/views/tools/shadow-generator/text-shadow/index.vue'),
            meta: {
              title: 'text-shadow',
              icon: 'mdi:text-shadow',
              keepAlive: true,
            },
          },
          {
            name: 'DropShadow',
            path: 'drop-shadow',
            component: () => import('@/views/tools/shadow-generator/drop-shadow/index.vue'),
            meta: {
              title: 'drop-shadow',
              icon: 'icon-park-twotone:drop-shadow-down',
              keepAlive: true,
            },
          },
        ],
      },
      {
        name: 'ClipPathGenerator',
        path: 'clipPath-generator',
        component: () => import('@/views/tools/clipPath-generator/index.vue'),
        meta: {
          title: 'clip-path生成器',
          icon: 'weui:clip-filled',
          keepAlive: true,
        },
      },
      {
        name: 'GradientGenerator',
        path: 'gradient-generator',
        component: () => import('@/views/tools/gradient-generator/index.vue'),
        meta: {
          title: '渐变生成器',
          icon: 'carbon:gradient',
          keepAlive: true,
        },
      },
    ],
  },
  {
    name: 'EchartsParent',
    path: '/echarts',
    component: BaseLayout,
    redirect: '/echarts/line-chart',
    meta: {
      sort: 2,
      title: 'echarts',
      icon: 'simple-icons:apacheecharts',
    },
    children: [
      {
        name: 'LineChart',
        path: 'line-chart',
        component: () => import('@/views/echarts/line-chart/index.vue'),
        meta: {
          title: '折线图',
          icon: 'tdesign:chart-line',
        },
      },
      {
        name: 'BarChart',
        path: 'bar-chart',
        component: () => import('@/views/echarts/bar-chart/index.vue'),
        meta: {
          title: '柱状图',
          icon: 'ic:round-bar-chart',
        },
      },
    ],
  },
  {
    name: 'System',
    path: '/system',
    component: BaseLayout,
    redirect: '/system/user-management',
    singleShow: true,
    meta: {
      sort: 14,
      title: '系统管理',
      icon: 'icon-park:setting-computer',
    },
    children: [
      {
        name: 'UserManagement',
        path: 'user-management',
        component: () => import('@/views/system/user/index.vue'),
        meta: {
          title: '用户管理',
          icon: 'ri:user-settings-line',
          keepAlive: true,
        },
      },
    ],
  },
  {
    name: 'AboutParent',
    path: '/about',
    component: BaseLayout,
    meta: {
      sort: 15,
    },
    children: [
      {
        name: 'About',
        path: 'index',
        component: () => import('@/views/about/index.vue'),
        meta: {
          title: '平台信息',
          icon: 'fluent:book-information-24-regular',
          keepAlive: true,
        },
      },
    ],
  },
  {
    name: 'UserZoneParent',
    path: '/userZone',
    component: BaseLayout,
    hidden: true,
    meta: {
      sort: 16,
    },
    children: [
      {
        name: 'UserZone',
        path: 'index',
        component: () => import('@/views/user/index.vue'),
        meta: {
          title: '个人中心',
          icon: 'mdi:user-outline',
          keepAlive: true,
        },
      },
    ],
  },
  {
    name: 'outLink',
    path: 'https://www.baidu.com',
    redirect: '',
    meta: {
      sort: 17,
      icon: 'token-branded:axe',
    },
  },
]
export default routes
