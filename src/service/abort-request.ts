import type { RequestConfig } from './type'

/**
 * @description 用于取消重复请求及
 */

/**
 * @description 用于存储控制器
 */
const pendingMap = new Map<string, AbortController>()
/**
 * @description 创建各请求唯一标识
 * @param config axiosConfig
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
  /**
   * @description 添加请求到请求池
   * @param config axiosConfig
   */
  addPending(config: RequestConfig) {
    this.removePending(config)
    const url = generateReqKey(config)
    const abortController = new AbortController()
    config.signal = abortController.signal
    pendingMap.set(url, abortController)
  }

  /**
   * @description 移除请求从请求池
   * @param config axiosConfig
   */
  removePending(config: RequestConfig) {
    const key = generateReqKey(config)
    if (pendingMap.has(key)) {
      pendingMap.get(key)?.abort()
      pendingMap.delete(key)
    }
  }

  /**
   * @description 取消请求池所有请求
   */
  removeAllPending() {
    pendingMap.forEach((abortController) => {
      if (abortController) {
        abortController.abort()
      }
    })
    this.clear()
  }

  /**
   * @description 清空请求池
   */ clear() {
    pendingMap.clear()
  }
}

export default AbortRequest
