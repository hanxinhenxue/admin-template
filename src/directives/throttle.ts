import type { App, Directive, DirectiveBinding } from 'vue'

interface ElType extends HTMLElement {
  __handleClick__: () => any
  disabled: boolean
}
/**
 * @description v-throttle按钮节流指令，防止按钮在短时间内被多次点击，使用节流函数限制规定时间内只能点击一次
 * @params function类型
 */
export default function throttle(app: App) {
  const throttleDirective: Directive = {
    mounted(el: ElType, binding: DirectiveBinding) {
      if (typeof binding.value !== 'function')
        throw new Error('callback must be a function')

      let timer: NodeJS.Timeout | null = null
      el.__handleClick__ = function () {
        if (timer)
          clearTimeout(timer)

        if (!el.disabled) {
          el.disabled = true
          binding.value()
          timer = setTimeout(() => {
            el.disabled = false
          }, 1000)
        }
      }
      el.addEventListener('click', el.__handleClick__)
    },
    beforeUnmount(el: ElType) {
      el.removeEventListener('click', el.__handleClick__)
    },
  }
  app.directive('throttle', throttleDirective)
}
