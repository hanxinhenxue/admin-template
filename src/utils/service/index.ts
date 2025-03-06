import CustomAxiosInstance from './instance'
import type { AxiosRequestConfig } from 'axios'

export function createRequest(options: AxiosRequestConfig = {}) {
	const defaultOptions: AxiosRequestConfig = {
		baseURL: '/',
		timeout: 60 * 1000,
		currentCount: 0,
		retryConfig: {
			count: 5,
			waitTime: 500,
		},
		abortRepetitiveRequest: true,
		needToken: true,
		needErrorTip: true,
	}
	const customAxios = new CustomAxiosInstance({
		...defaultOptions,
		...options,
	})
	return customAxios.getAxiosInstance()
}
export const request = createRequest()
