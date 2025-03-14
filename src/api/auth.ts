import { request } from '@/service'
/**
 * @description 获取验证码
 */
export function getImgCode(params = {}) {
  return request({
    url: '/api/getImgCode',
    method: 'get',
    params,
  })
}

/**
 * @description 用户名密码登录
 * @param data username 用户名 password 密码：md5加密
 */
export function fetchToken(data = {}) {
  return request({
    url: '/api/auth/login',
    method: 'post',
    data,
  })
}

/**
 * @description 获取用户信息
 */
export function fetchUserInfo() {
  return request({
    url: '/api/auth/getUserInfo',
  })
}

/**
 * @description 退出登录
 */
export function toLogout() {
  return request({
    url: '/api/auth/logout',
    method: 'post',
  })
}
