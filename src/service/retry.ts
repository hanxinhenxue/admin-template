/**
 * @description 错误请求进行重试
 */
import type { AxiosInstance } from 'axios'
import type { RequestConfig } from './type'

// 最大重连次数
const MAX_RETRY = 3

export async function retry(instance: AxiosInstance, config: RequestConfig) {
  let { retry = MAX_RETRY, __retryCount = 0 } = config
  if (__retryCount < retry) {
    __retryCount += 1
    await new Promise(resolve =>
      setTimeout(resolve, 1000 * __retryCount),
    )
    return instance(config)
  }
}
