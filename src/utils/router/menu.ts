import type { RouteMeta } from 'vue-router'
import { NBadge } from 'naive-ui'
import { h } from 'vue'
/**
 * @description 渲染菜单栏额外
 * @param extra 额外配置
 */
export function renderExtra(extra: RouteMeta = {}) {
  if (extra?.badge) {
    if (typeof extra.badge === 'boolean') {
      return () =>
        h(NBadge, {
          dot: true,
          processing: true,
          style: 'marginLeft: 5px',
        })
    }
    else {
      return () =>
        h(NBadge, {
          value: typeof extra.badge === 'string' || typeof extra.badge === 'number' ? extra.badge : '',
          style: 'marginLeft: 5px',
        })
    }
  }
  return () => null
}
/**
 * @description 判断路径是否是外链
 * @param path 路径
 */
export function isExternal(path: string) {
  return /^(?:https?|mailto|tel):/.test(path)
}
/**
 * @description 将嵌套路径转换为完整路径
 * @param basePath 父级路径
 * @param path 路径
 */
export function resolvePath(basePath: string, path: string) {
  if (isExternal(path))
    return path
  return (
    `/${
      [basePath, path]
        .filter(path => !!path && path !== '/')
        .map(path => path.replace(/(^\/)|(\/$)/g, ''))
        .join('/')}`
  )
}
