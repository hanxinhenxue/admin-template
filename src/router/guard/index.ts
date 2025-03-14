import type { Router } from 'vue-router'
/**
 * 路由守卫函数
 * @param router - 路由实例
 */
import { useTitle } from '@vueuse/core'
import { createPermissionGuard } from './dynamic'

const { VITE_TITLE } = import.meta.env

export function setupRouterGuards(router: Router) {
  router.beforeEach(async (to, from, next) => {
    window.$loadingBar?.start()
    // 页面跳转权限处理
    await createPermissionGuard(to, from, next)
  })

  router.afterEach(async (to) => {
    useTitle(to.meta?.title || VITE_TITLE)
    setTimeout(() => {
      window.$loadingBar?.finish()
    }, 200)
  })

  router.onError(() => {
    window.$loadingBar?.error()
  })
}
