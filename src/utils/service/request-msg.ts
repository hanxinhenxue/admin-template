/**
 * @description 请求消息控制
 */
/** 消息显示时长 */
const ERROR_MSG_DURATION = 3 * 1000
/** 特殊不展示提示的code码集合 */
const NO_ERROR_MSG_CODE: (string | number)[] = ['ERR_CANCELED']
/** 错误消息栈，防止同一错误同时出现 */
const errorMsgStack = new Map<string | number, string>([])

function addErrorMsg(error: UtilTypes.RequestError) {
	errorMsgStack.set(error.code, error.msg)
}
function removeErrorMsg(error: UtilTypes.RequestError) {
	errorMsgStack.delete(error.code)
}
function hasErrorMsg(error: UtilTypes.RequestError) {
	return errorMsgStack.has(error.code)
}

/**
 * 显示错误信息
 * @param error
 */
export function showErrorMsg(error: UtilTypes.RequestError) {
	if (!error.msg || NO_ERROR_MSG_CODE.includes(error.code) || hasErrorMsg(error)) return
	addErrorMsg(error)
	window.console.warn(error.code, error.msg)
	window.$message?.error(error.msg, { duration: ERROR_MSG_DURATION })
	setTimeout(() => {
		removeErrorMsg(error)
	}, ERROR_MSG_DURATION)
}
