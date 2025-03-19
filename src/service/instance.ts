import type { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import type { RequestConfig } from './type'
import { useAuthStore } from '@/store'
import axios from 'axios'
import AbortRequest from './abort-request'
import { handleError } from './error-msg'
import { autoFormatParamsInterceptor } from './format-params'
import { retry } from './retry'

export default class CustomAxiosInstance {
  /* axios请求实例 */
  instance: AxiosInstance
  /* 请求成功的状态码 */
  successCodes: (string | number)[] = [0, 200, 'ok']

  constructor(axiosConfig: AxiosRequestConfig) {
    // 实例化
    this.instance = axios.create(axiosConfig)
    this.setInterceptor()
  }

  /** 设置请求拦截器 */
  setInterceptor() {
    // 创建取消请求实例
    const abortAxios = new AbortRequest()

    /* 请求拦截器 */
    this.instance.interceptors.request.use(
      async (config) => {
        const contentType = config.headers?.['Content-Type']
          || config.headers?.['content-type']

        // 自动识别未指定Content-Type的情况
        if (!contentType) {
          if (config.data instanceof FormData) {
            config.headers!['Content-Type'] = 'multipart/form-data'
          }
          else if (typeof config.data === 'object') {
            config.headers!['Content-Type'] = 'application/json'
          }
        }
        const authStore = useAuthStore()
        if (authStore.token) {
          config.headers.Authorization = `Bearer ${authStore.token}`
        }

        config.data = await autoFormatParamsInterceptor(config.data, contentType)

        abortAxios.addPending(config)

        // 添加token

        return config
      },
      (axiosError: AxiosError) => {
        return Promise.reject(axiosError)
      },
    )
    /* 响应拦截器 */
    this.instance.interceptors.response.use(
      async (response: AxiosResponse) => {
        const { data, status, config } = response

        abortAxios.removePending(config)

        const code = data?.code ? data.code : status
        // 防止后端返回的code是字符串
        if (this.successCodes.includes(code)) {
          return Promise.resolve(data)
        }
        handleError(data)
        return Promise.reject(data)
      },
      (err: AxiosError) => {
        const config = err.config as RequestConfig
        abortAxios.removePending(config)
        retry(this.instance, config)
        return handleError(err)
      },
    )
  }

  /** 获取 axios实例 */
  getAxiosInstance() {
    return this.instance
  }
}
