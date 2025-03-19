<template>
  <hover-container class="h-full w-40px" tooltip-content="全屏" :inverted="themeStore.header.inverted" @click="toggle">
    <n-icon size="20" class="cursor-pointer">
      <SvgIcon v-if="isFullscreen" icon="fluent:full-screen-minimize-20-filled" />
      <SvgIcon v-else icon="fluent:full-screen-maximize-20-filled" />
    </n-icon>
  </hover-container>
</template>

<script setup lang="ts">
import { useThemeStore } from '@/store'
import { useFullscreen } from '@vueuse/core'

defineOptions({ name: 'FullScreen' })
const { isFullscreen, toggle } = useFullscreen()
const themeStore = useThemeStore()
</script>
