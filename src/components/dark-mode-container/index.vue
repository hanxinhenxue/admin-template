<template>
  <div class="all dark:bg-dark dark:text-white dark:text-opacity-82" :class="inverted ? 'bg-#001428 text-white' : 'bg-white text-#333639'">
    <slot />
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'DarkModeContainer' })

const { inverted = false } = defineProps<Props>()

interface Props {
  inverted?: boolean
}
</script>
