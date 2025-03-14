import type { AxiosRequestConfig } from 'axios'
import CustomAxiosInstance from './instance'

export function createRequest(options: AxiosRequestConfig = {}) {
  const defaultOptions: AxiosRequestConfig = {
    baseURL: '/',
    timeout: 60 * 1000,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    },
  }
  const customAxios = new CustomAxiosInstance({
    ...defaultOptions,
    ...options,
  })
  return customAxios.getAxiosInstance()
}
export const request = createRequest()
