import type { App, Directive, DirectiveBinding } from 'vue'

interface ElType extends HTMLElement {
  __handleClick__: () => any
}
/**
 * @description v-debounce按钮防抖指令，可自行扩展至input
 * @params function类型
 */
export default function debounce(app: App) {
  const debounceDirective: Directive = {
    mounted(el: ElType, binding: DirectiveBinding) {
      if (typeof binding.value !== 'function')
        throw new Error('callback must be a function')

      let timer: NodeJS.Timeout | null = null
      el.__handleClick__ = function () {
        if (timer)
          clearInterval(timer)

        timer = setTimeout(() => {
          binding.value()
        }, 500)
      }
      el.addEventListener('click', el.__handleClick__)
    },
    beforeUnmount(el: ElType) {
      el.removeEventListener('click', el.__handleClick__)
    },
  }
  app.directive('debounce', debounceDirective)
}
