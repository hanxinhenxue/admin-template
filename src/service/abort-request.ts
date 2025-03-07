import type { RequestConfig } from './type'

/**
 * @description 用于取消重复请求及
 */

/**
 * 用于存储控制器
 */
const pendingMap = new Map<string, AbortController>()
/**
 * 创建各请求唯一标识
 * @param config
 */
function generateReqKey(config: RequestConfig) {
  return [
    config.method,
    config.url,
    JSON.stringify(config.params),
    JSON.stringify(config.data),
  ].join('&')
}

class AbortRequest {
  addPending(config: RequestConfig) {
    this.removePending(config)
    const url = generateReqKey(config)
    const abortController = new AbortController()
    config.signal = abortController.signal
    pendingMap.set(url, abortController)
  }

  removePending(config: RequestConfig) {
    const key = generateReqKey(config)
    if (pendingMap.has(key)) {
      pendingMap.get(key)?.abort()
      pendingMap.delete(key)
    }
  }

  removeAllPending() {
    pendingMap.forEach((abortController) => {
      if (abortController) {
        abortController.abort()
      }
    })
    this.clear()
  }

  clear() {
    pendingMap.clear()
  }
}

export default AbortRequest
