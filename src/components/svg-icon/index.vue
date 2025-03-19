<template>
  <template v-if="renderLocalIcon">
    <svg aria-hidden="true" width="1rem" height="1rem" v-bind="bindAttrs">
      <use :xlink:href="symbolId" fill="currentColor" />
    </svg>
  </template>
  <template v-else>
    <Icon v-if="icon" :icon="icon" v-bind="bindAttrs" />
  </template>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
/**
 * 图标组件
 * - 支持iconify和本地svg图标
 * - 同时传递了icon和localIcon，localIcon会优先渲染
 */
defineOptions({ name: 'SvgIcon' })

const { icon, localIcon, size = 20 } = defineProps<Props>()

interface Props {
  icon?: string
  localIcon?: string
  size?: number
}

const attrs = useAttrs()
// 在配置中决定了local开头的是本地svg
const symbolId = computed(() => {
  const { VITE_ICON_PREFIX: prefix } = import.meta.env
  return `#${prefix}-${localIcon}`
})

const bindAttrs = computed<{ class: string, style: Record<string, string> }>(() => {
  const defaultStyle: Record<string, string> = {}
  const style = attrs.style || defaultStyle // 确保 style 是对象类型
  const classValue = attrs.class ? String(attrs.class) : ''
  return {
    class: classValue,
    style: {
      ...defaultStyle,
      ...style, // 安全扩展
      width: `${String(size).replace('px', '')}px`,
      height: `${String(size).replace('px', '')}px`,
    },
    ...attrs,
  }
})

const renderLocalIcon = computed(() => localIcon || !icon)
</script>
