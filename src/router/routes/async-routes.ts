import type { RouteRecordRaw } from 'vue-router'
/**
 * @description 异步路由，可能会添加权限的路由，需要登录后才能看到
 */
const modules: Record<string, { default: any }> = import.meta.glob('@/views/index.ts', { eager: true })

const asyncRoutes: RouteRecordRaw[] = []

Object.keys(modules).forEach((key) => {
  const mod = modules[key].default || {} // 获取导出的路由数组或者单个对象
  const modList = Array.isArray(mod) ? [...mod] : [mod]
  asyncRoutes.push(...modList)
})
// 路由排序
function sortRoute(a: RouteRecordRaw, b: RouteRecordRaw) {
  return (a.meta?.sort || 0) - (b.meta?.sort || 0)
}
asyncRoutes.sort(sortRoute)

export default asyncRoutes
