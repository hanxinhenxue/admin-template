import { localStg } from '@/utils'
/**
 * @description 获取本地存储的token
 */
export function getToken() {
  return localStg.get('token') || ''
}
/**
 * @description 清除本地用户信息
 */
export function clearAuthStorage() {
  localStg.remove('token')
  localStg.remove('userInfo')
}
