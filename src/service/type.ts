import type { AxiosRequestConfig } from 'axios'

export type RequestConfig = AxiosRequestConfig & {
  retry?: number // 重试次数
  __retryCount?: number // 当前重试次数
  autoFormat?: boolean // 新增自动格式化开关
}
