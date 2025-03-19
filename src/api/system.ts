import { request } from '@/service'
/**
 * @description 获取用户列表
 * @param params page 页码 size 每页多少条
 */
export function fetchGetUserList(params = {}) {
  return request({
    url: '/api/user/list',
    method: 'post',
    params,
  })
}
