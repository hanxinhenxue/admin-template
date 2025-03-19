/**
 * @description 切换html class
 * @param className 类名
 */
export function toggleHtmlClass(className: string) {
  function add() {
    document.documentElement.classList.add(className)
  }

  function remove() {
    document.documentElement.classList.remove(className)
  }

  return {
    add,
    remove,
  }
}

/**
 * @description 获取当前时间点
 * @return 时间点描述
 */
export function getTimePoint() {
  const hour = new Date().getHours()
  if (hour < 6)
    return '凌晨好 🌛'
  if (hour < 9)
    return '早上好 ⛅'
  if (hour < 12)
    return '上午好 🌞'
  if (hour < 14)
    return '中午好 ☀️'
  if (hour < 17)
    return '下午好 🌤️'
  if (hour < 19)
    return '傍晚好 🌙'
  if (hour < 22)
    return '晚上好 ⭐'
}

/**
 * @description 获取元素的位置
 * @return 元素的位置信息
 */
export function getBoundingClientRect(element: Element) {
  if (!element || !element.getBoundingClientRect) {
    return 0
  }
  return element.getBoundingClientRect()
}

export function fallbackValue() {
  return {
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    rightIncludeBody: 0,
    bottomIncludeBody: 0,
  }
}
/**
 * @description 获取元素的偏移位置
 * @return 元素的位置信息
 */
export function getViewportOffset(element: Element) {
  try {
    if (!element?.getBoundingClientRect)
      return fallbackValue()

    const docElement = document.documentElement
    const { pageXOffset, pageYOffset } = window
    const box = element.getBoundingClientRect()
    const { left: retLeft, top: rectTop, width: rectWidth, height: rectHeight } = box

    // 计算基准值
    const clientWidth = docElement.clientWidth
    const clientHeight = docElement.clientHeight
    const scrollAdjust = {
      x: pageXOffset - (docElement.clientLeft || 0),
      y: pageYOffset - (docElement.clientTop || 0),
    }

    // 最终坐标计算
    const adjustedLeft = retLeft + pageXOffset - scrollAdjust.x
    const adjustedTop = rectTop + pageYOffset - scrollAdjust.y

    return {
      left: adjustedLeft,
      top: adjustedTop,
      right: clientWidth - (adjustedLeft + rectWidth),
      bottom: clientHeight - (adjustedTop + rectHeight),
      rightIncludeBody: clientWidth - adjustedLeft,
      bottomIncludeBody: clientHeight - adjustedTop,
    }
  }
  catch (e) {
    console.error('Element position calculation failed:', e)
    return fallbackValue()
  }
}
