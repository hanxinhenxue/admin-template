/**
 * @description 对错误状态码进行检测
 */
import { isString, isNumber } from '../common'

export function checkErrorStatus(code: number | string | undefined, message: string = '请求错误') {
	let errorMessage = message ?? '请求错误'
	switch (code) {
		case 400:
			errorMessage = '客户端错误，请求格式或参数有误！'
			break
		case 401:
			errorMessage = '身份认证不通过'
			break
		case 403:
			errorMessage = '用户得到授权，但是访问是被禁止的!'
			break
		case 404:
			errorMessage = '未找到目标资源!'
			break
		case 405:
			errorMessage = '请求方法未允许!'
			break
		case 408:
			errorMessage = '网络请求超时!'
			break
		case 500:
			errorMessage = '服务器内部错误!'
			break
		case 501:
			errorMessage = '服务器未实现请求功能!'
			break
		case 502:
			errorMessage = '错误网关!'
			break
		case 503:
			errorMessage = '服务不可用!'
			break
		case 505:
			errorMessage = 'http版本不支持该请求!'
			break
		case 'ERR_BAD_OPTION_VALUE':
			errorMessage = '配置中提供的值无效或不受支持'
			break
		case 'ERR_BAD_OPTION':
			errorMessage = '配置中提供的选项无效'
			break
		case 'ECONNABORTED':
			errorMessage = '超过配置中指定的超时时间，请求超时'
			break
		case 'ETIMEDOUT':
			errorMessage = '超过了默认的时间限制，请求超时'
			break
		case 'ERR_NETWORK':
			errorMessage = '网络错误'
			break
		case 'ERR_FR_TOO_MANY_REDIRECTS':
			errorMessage = '请求重定向次数过多'
			break
		case 'ERR_DEPRECATED':
			errorMessage = '使用的不推荐的功能或方法'
			break
		case 'ERR_BAD_RESPONSE':
			errorMessage = '无法正确分析响应或响应的格式'
			break
		case 'ERR_BAD_REQUEST':
			errorMessage = '请求的格式意外或缺少必需的参数'
			break
		case 'ERR_NOT_SUPPORT':
			errorMessage = '当前环境中不支持的功能或方法'
			break
		case 'ERR_INVALID_URL':
			errorMessage = '提供的URL无效'
			break
		case 'ERR_CANCELED':
			errorMessage = '功能或方法被用户明确取消'
			break
	}
	return errorMessage
}
/**
 * axios中http转换code码，防止后端传来的状态码是字符串
 * @param code - 状态码number | string
 */
export function transHttpCode(code: number | string) {
	// 是number直接返回
	if (isNumber(code)) {
		return code
	}
	// 是number字符串，转成number返回
	if (isString(code)) {
		if (!Number.isNaN(Number(code))) {
			return Number(code)
		} else {
			// 是内置的string格式状态码
			return code
		}
	}
	return code
}
