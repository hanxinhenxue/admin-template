import type { RouteMeta } from 'vue-router'
import { NBadge } from 'naive-ui'
import { h } from 'vue'

export function renderExtra(extra: RouteMeta = {}) {
  if (extra?.dot) {
    if (typeof extra.dot === 'boolean') {
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
          value: typeof extra.dot === 'string' || typeof extra.dot === 'number' ? extra.dot : '',
          style: 'marginLeft: 5px',
        })
    }
  }
  return () => null
}

export function isExternal(path: string) {
  return /^(?:https?|mailto|tel):/.test(path)
}

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
