import SvgIcon from '@/components/svg-icon/index.vue'
import { h } from 'vue'

interface IconConfig {
  /** 在线图标名称 */
  icon?: string
  /** 本地图标名称 */
  localIcon?: string
  /** 图标颜色 */
  color?: string
  /** 图标尺寸 */
  iconFontSize?: number
}

type IconStyle = Partial<Pick<CSSStyleDeclaration, 'color' | 'width' | 'height'>>

/**
 * @description 使用hooks形式创建svg图标
 * @param config 图标配置
 * @return vNode
 */
export function useSvgIcon(config: IconConfig) {
  const { color, iconFontSize, icon, localIcon } = config

  const style: IconStyle = {}

  if (color) {
    style.color = color
  }
  if (iconFontSize) {
    style.width = `${iconFontSize}px`
    style.height = `${iconFontSize}px`
  }

  if (!icon && !localIcon) {
    return () => null
  }

  return () => h(SvgIcon, { icon, localIcon, style })
}
