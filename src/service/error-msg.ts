import type { AxiosError } from 'axios'
import { checkErrorStatus } from './checkError'
/**
 * @description 请求消息控制
 */
/** 消息显示时长 */
const ERROR_MSG_DURATION = 3 * 1000
/** 特殊不展示提示的code码集合，默认是用户重复请求被取消的错误 */
const NO_ERROR_MSG_CODE: (string | number | undefined)[] = ['ERR_CANCELED']
/** 是否正在展示提示 */
let isShowingError = false

/**
 * @description 显示错误信息
 * @param error
 */
export function handleError(error: AxiosError) {
  // 网络错误处理
  if (!window.navigator.onLine) {
    return window.$message?.error('网络连接已断开，请检查网络', { duration: ERROR_MSG_DURATION })
  }

  const msg = checkErrorStatus(error.code, error.message)
  if (!isShowingError && !NO_ERROR_MSG_CODE.includes(error.code)) {
    isShowingError = true
    window.$message?.error(msg, {
      duration: ERROR_MSG_DURATION,
      onAfterLeave: () => {
        isShowingError = false
      },
    })
  }
  return Promise.reject(error)
}
