import type { App, Directive, DirectiveBinding } from 'vue'

/**
 * @description 按钮级别显示，根据userinfo中的permissions按钮级别权限
 *
 */
import { usePermission } from '@/hooks'

export default function permission(app: App) {
  const { hasPermission } = usePermission()

  function updateElVisible(el: HTMLElement, permission: string | string[]) {
    if (!permission) {
      throw new Error(`need roles: like v-has="'admin'", v-has="['admin', 'test]"`)
    }
    if (!hasPermission(permission)) {
      el.parentElement && el.parentElement.removeChild(el)
    }
  }

  const permissionDirective: Directive = {
    mounted(el: HTMLElement, binding: DirectiveBinding) {
      updateElVisible(el, binding.value)
    },
    beforeUpdate(el: HTMLElement, binding: DirectiveBinding) {
      updateElVisible(el, binding.value)
    },
  }

  app.directive('has', permissionDirective)
}
