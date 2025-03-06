/**
 * @description 错误请求进行重试
 */
import type { AxiosError, AxiosInstance } from 'axios'

export function retry(instance: AxiosInstance, err: AxiosError) {
	const config: any = instance.defaults
	const { waitTime, count } = config.retryConfig
	console.log(`第${config.currentCount}次重连`)
	if (config.currentCount >= count || isNaN(config.currentCount)) {
		delete config.currentCount
		return Promise.reject(err)
	}
	config.currentCount++
	return wait(waitTime).then(() => instance(config))
}

function wait(waitTime: number) {
	return new Promise((resolve) => setTimeout(resolve, waitTime))
}
