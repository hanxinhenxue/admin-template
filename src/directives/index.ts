import type { App } from 'vue'
import debounce from './debounce'
import permission from './permission'
import throttle from './throttle'

/**
 * @description 安装自定义的vue指令
 */
export function setupDirectives(app: App) {
  const directives = [permission, throttle, debounce]
  directives.forEach((directive) => {
    directive(app)
  })
}
