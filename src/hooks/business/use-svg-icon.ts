import type { Component } from 'vue'
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
  fontSize?: number
}

type IconStyle = Partial<Pick<CSSStyleDeclaration, 'color' | 'fontSize'>>
/**
 * Svg icon render hook
 *
 * @param config 图标配置
 */
export default function useSvgIcon(config: IconConfig) {
  /**
   * Svg icon VNode
   *
   * @param config
   */
  const { color, fontSize, icon, localIcon } = config

  const style: IconStyle = {}

  if (color) {
    style.color = color
  }
  if (fontSize) {
    style.fontSize = `${fontSize}px`
  }

  if (!icon && !localIcon) {
    return undefined
  }

  return () => h(SvgIcon, { icon, localIcon, style })
}
