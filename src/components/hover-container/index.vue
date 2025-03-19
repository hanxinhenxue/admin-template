<template>
  <div v-if="showTooltip">
    <n-tooltip :placement="placement" trigger="hover" :style="{ maxWidth: '400px' }">
      <template #trigger>
        <div class="h-full flex-center cursor-pointer dark:hover:bg-#333" :class="contentClassName">
          <slot />
        </div>
      </template>
      {{ tooltipContent }}
    </n-tooltip>
  </div>
  <div v-else class="flex-center cursor-pointer dark:hover:bg-#333" :class="contentClassName">
    <slot />
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'HoverContainer' })

const { tooltipContent = '', placement = 'bottom', contentClass = '', inverted = false } = defineProps<Props>()

interface Props {
  tooltipContent?: string
  placement?: 'top-start' | 'top' | 'top-end' | 'right-start' | 'right' | 'right-end' | 'bottom-start' | 'bottom' | 'bottom-end' | 'left-start' | 'left' | 'left-end'
  contentClass?: string
  inverted?: boolean
}
const showTooltip = computed(() => Boolean(tooltipContent))

const contentClassName = computed(() => `${contentClass} ${inverted ? 'hover:bg-primary' : 'hover:bg-#f6f6f6'}`)
</script>

<style scoped></style>
