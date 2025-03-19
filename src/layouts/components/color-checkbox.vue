<template>
  <div class="pointer h-20px w-20px flex-center rounded-2px shadow" :style="{ backgroundColor: color }">
    <SvgIcon v-if="checked" icon="ic:outline-check" :size="14" :class="[isWhite ? 'text-gray-700' : 'text-white']" />
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'ColorCheckbox' })

const { color = '#ffffff', checked = false } = defineProps<{
  /** 颜色 */
  color?: string
  /** 是否选中 */
  checked?: boolean
}>()
const whiteColors = ['#ffffff', '#fff', 'rgb(255,255,255)']
const isWhite = computed(() => whiteColors.includes(color))
</script>

<style scoped></style>
