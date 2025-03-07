import type { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import type { RequestConfig } from './type'
import axios from 'axios'
import AbortRequest from './abort-request'
import { handleError } from './error-msg'
import { autoFormatParamsInterceptor } from './format-params'
import { retry } from './retry'

const instance = axios.create({
  baseURL: '/',
  timeout: 60 * 1000,
  withCredentials: true,
})

const abortAxios = new AbortRequest()

const SUCCESS_CODES: (string | number)[] = [0, 200, 'ok']

instance.interceptors.request.use((config) => {
  config = autoFormatParamsInterceptor(config) as unknown as InternalAxiosRequestConfig<any>

  abortAxios.addPending(config)

  // 添加认证头（示例）
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
}, (axiosError: AxiosError) => {
  return Promise.reject(axiosError)
})

instance.interceptors.response.use(
  (response: AxiosResponse) => {
    abortAxios.removePending(response.config)

    const code = response.data?.code
    // 防止后端返回的code是字符串
    if (SUCCESS_CODES.includes(code)) {
      return Promise.resolve(response.data)
    }

    return Promise.reject(response.data)
  },
  (err: AxiosError) => {
    const config = err.config as RequestConfig

    abortAxios.removePending(config)

    retry(instance, config)

    return handleError(err)
  },
)
