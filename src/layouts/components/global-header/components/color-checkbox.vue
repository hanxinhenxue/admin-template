<template>
  <div class="pointer h-20px w-20px flex-center rounded-2px shadow" :style="{ backgroundColor: color }">
    <SvgIcon v-if="checked" icon="ic:outline-check" :size="14" :class="[isWhite ? 'text-gray-700' : 'text-white']" />
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'ColorCheckbox' })
const props = defineProps({
  /** 颜色 */
  color: {
    type: String,
    default: '#ffffff',
  },
  /** 是否选中 */
  checked: {
    type: Boolean,
    default: false,
  },
})

const whiteColors = ['#ffffff', '#fff', 'rgb(255,255,255)']
const isWhite = computed(() => whiteColors.includes(props.color))
</script>

<style scoped></style>
