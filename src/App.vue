<template>
  <NConfigProvider
    :theme="themeStore.naiveTheme"
    :theme-overrides="themeStore.naiveThemeOverrides"
    :locale="zhCN"
    :date-locale="dateZhCN"
    class="h-full"
  >
    <AppProvider>
      <RouterView />
      <NWatermark v-if="themeStore.watermark.visible" v-bind="watermarkProps" />
    </AppProvider>
  </NConfigProvider>
</template>

<script setup lang="ts">
import type { WatermarkProps } from 'naive-ui'
import { useThemeStore } from '@/store'
import { dateZhCN, NConfigProvider, zhCN } from 'naive-ui'

defineOptions({ name: 'App' })

const themeStore = useThemeStore()

const watermarkProps = computed<WatermarkProps>(() => {
  return {
    content: themeStore.watermark.text,
    cross: true,
    fullscreen: true,
    fontSize: 16,
    lineHeight: 16,
    width: 384,
    height: 384,
    xOffset: 12,
    yOffset: 60,
    rotate: -15,
    zIndex: 9999,
  }
})
</script>
