import { request } from '@/service'
/**
 * @description 获取用户列表
 */
export function fetchGetUserList(params = {}) {
  return request({
    url: '/api/user/list',
    method: 'post',
    params,
  })
}
