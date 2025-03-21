<template>
  <n-divider title-placement="center">
    布局模式
  </n-divider>
  <ModeCard v-model:mode="themeStore.layout.mode" :disabled="appStore.isMobile">
    <template #vertical>
      <div class="layout-sider h-full w-18px" />
      <div class="vertical-wrapper">
        <div class="layout-header" />
        <div class="layout-main" />
      </div>
    </template>
    <template #vertical-mix>
      <div class="layout-sider h-full w-8px" />
      <div class="layout-sider h-full w-16px" />
      <div class="vertical-wrapper">
        <div class="layout-header" />
        <div class="layout-main" />
      </div>
    </template>
    <template #horizontal>
      <div class="layout-header" />
      <div class="horizontal-wrapper">
        <div class="layout-main" />
      </div>
    </template>
    <template #horizontal-mix>
      <div class="layout-header" />
      <div class="horizontal-wrapper">
        <div class="layout-sider w-18px" />
        <div class="layout-main" />
      </div>
    </template>
  </ModeCard>
</template>

<script setup lang="ts">
import { useAppStore, useThemeStore } from '@/store'
import ModeCard from './mode-card.vue'

defineOptions({ name: 'DarkMode' })

const themeStore = useThemeStore()
const appStore = useAppStore()
</script>

  <style lang="scss" scoped>
  .layout-header {
    --uno: h-16px bg-primary rd-4px;
  }

  .layout-sider {
    --uno: bg-primary opacity-30 rd-4px;
  }

  .layout-main {
    --uno: flex-1 bg-primary opacity-20 rd-4px;
  }

  .vertical-wrapper {
    --uno: flex-1 flex-col gap-6px;
  }

  .horizontal-wrapper {
    --uno: flex-1 flex gap-6px;
  }
  </style>
