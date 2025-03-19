import SvgIcon from '@/components/svg-icon/index.vue'
import { h } from 'vue'

interface IconConfig {
  /** Iconify icon name */
  icon?: string
  /** Local icon name */
  localIcon?: string
  /** Icon color */
  color?: string
  /** Icon size */
  iconFontSize?: number
}

type IconStyle = Partial<Pick<CSSStyleDeclaration, 'color' | 'width' | 'height'>>
/**
 * Svg icon render hook
 *
 * @param config 图标配置
 */
export function useSvgIcon(config: IconConfig) {
  /**
   * Svg icon VNode
   *
   * @param config
   */
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
