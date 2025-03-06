import { AxiosRequestConfig } from 'axios'
import qs from 'qs'
/**
 * @description 用于取消重复请求及
 */

/**
 * 用于存储控制器
 */
const pendingMap = new Map<string, AbortController>()
/**
 * 创建各请求唯一标识
 * @param config
 * @returns
 */
const getPendingUrl = (config: AxiosRequestConfig) => {
	return [config.method, config.url, qs.stringify(config.data), qs.stringify(config.params)].join('&')
}

class AbortAxios {
	addPending(config: AxiosRequestConfig) {
		this.removePending(config)
		const url = getPendingUrl(config)
		const abortController = new AbortController()
		config.signal = abortController.signal
		if (!pendingMap.has(url)) {
			pendingMap.set(url, abortController)
		}
	}

	removePending(config: AxiosRequestConfig) {
		const url = getPendingUrl(config)
		if (pendingMap.has(url)) {
			const abortController = pendingMap.get(url)
			abortController?.abort()
			pendingMap.delete(url)
		}
	}

	removeAllPending() {
		pendingMap.forEach((abortController) => {
			if (abortController) {
				abortController.abort()
			}
		})
		this.clear()
	}

	clear() {
		pendingMap.clear()
	}
}

export default AbortAxios
