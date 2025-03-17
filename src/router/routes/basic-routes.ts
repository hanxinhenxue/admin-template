import type { RouteRecordRaw } from 'vue-router'
/**
 * @description 基础路由，无权限也能访问的，如登录
 * @param hidden 是否在侧边栏隐藏，基础路由必须填写此项
 */
// 常量路由
export const CONSTANT_ROUTES: RouteRecordRaw[] = [
  {
    name: 'Root',
    path: '/',
    redirect: import.meta.env.VITE_ROUTE_HOME_PATH,
    hidden: true,
  },
  {
    name: import.meta.env.VITE_ROUTE_LOGIN_NAME,
    path: '/login',
    hidden: true,
    component: () => import('@/views/builtin/login/index.vue'),
    meta: {
      title: '登录',
    },
  },
  {
    name: 'NotFound',
    path: '/not-found',
    component: () => import('@/views/builtin/not-found/index.vue'),
    meta: { title: '页面飞走了' },
    hidden: true,
  },
  {
    name: import.meta.env.VITE_ROUTE_NOPERMISSIONS_NAME,
    path: '/no-permissions',
    component: () => import('@/views/builtin/no-permission/index.vue'),
    meta: { title: '无权限' },
    hidden: true,
  },
]
// 捕获异常路由
export const CATCH_ROUTE = {
  name: 'CatchRoute',
  path: '/:pathMatch(.*)*',
  redirect: '/not-found',
}
