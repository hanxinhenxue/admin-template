import axios from 'axios'
import type { AxiosResponse, AxiosError, AxiosInstance, AxiosRequestConfig, ContentType } from 'axios'
import AbortAxios from './abortAxios'
import { transformRequestData } from './transfrom'
import { checkErrorStatus, transHttpCode } from './checkError'
import { showErrorMsg } from './request-msg'
import { retry } from './retry'

/**
 * @description 自定义封装axios
 */
export default class CustomAxiosInstance {
	/* axios请求实例 */
	instance: AxiosInstance

	constructor(axiosConfig: AxiosRequestConfig) {
		// 实例化
		this.instance = axios.create(axiosConfig)
		this.setInterceptor()
	}

	/** 设置请求拦截器 */
	setInterceptor() {
		// 创建取消请求实例
		const abortAxios = new AbortAxios()

		/* 成功的状态码 */
		const SUCCESS_CODES: (string | number)[] = [0, 200, 'ok']

		/* 请求拦截器 */
		this.instance.interceptors.request.use(
			async (config) => {
				const abortRepetitiveRequest = config.abortRepetitiveRequest ?? true
				if (abortRepetitiveRequest) {
					// 存储请求标识
					abortAxios.addPending(config)
				}
				// 处理不需要token的请求
				if (!config.needToken) {
					return config
				}

				const contentType = config.headers['Content-Type'] as ContentType
				config.data = await transformRequestData(config.data, contentType)
				return config
			},
			(axiosError: AxiosError) => {
				return Promise.reject(axiosError)
			}
		)
		/* 响应拦截器 */
		this.instance.interceptors.response.use(
			async (response: AxiosResponse) => {
				const { data, status, config, statusText } = response
				if (config.abortRepetitiveRequest) {
					// 移除请求标识
					abortAxios.removePending(config)
				}
				const code = data?.code ? transHttpCode(data.code) : status
				// 防止后端返回的code是字符串
				if (SUCCESS_CODES.includes(code)) {
					return Promise.resolve(response.data)
				}
				// 需要错误提示，全局提示一次
				if (config.needErrorTip) {
					const msg = checkErrorStatus(code, data?.message ?? statusText)
					showErrorMsg({ code, msg })
				}
				return Promise.resolve(response.data)
			},
			(err: AxiosError) => {
				const code = err?.code ?? 'undefined'
				const msg = checkErrorStatus(code, err.message)
				/** 这里会遇到重复请求取消的错误，不提示，不重复请求 */
				if (axios.isCancel(err)) {
					// 取消请求
					return Promise.reject(err)
				}
				showErrorMsg({ code, msg })
				return retry(this.instance, err)
			}
		)
	}
	/** 获取 axios实例 */
	getAxiosInstance() {
		return this.instance
	}
}
