<template>
  <hover-container class="h-full w-40px" tooltip-content="主题配置" @click="appStore.setDrawerVisible(true)">
    <n-icon size="24" class="cursor-pointer">
      <SvgIcon icon="majesticons:color-swatch-line" />
    </n-icon>
  </hover-container>

  <n-drawer v-model:show="appStore.drawerVisible" display-directive="show" :width="360">
    <n-drawer-content title="主题配置" :native-scrollbar="false" closable>
      <DarkMode />
      <LayoutMode />
      <ThemeColor />
      <PageFun />
    </n-drawer-content>
  </n-drawer>
</template>

<script setup lang="ts">
import { useAppStore } from '@/store'
import DarkMode from './dark-mode.vue'
import LayoutMode from './layout-mode.vue'
import PageFun from './page-fun.vue'
import ThemeColor from './theme-color.vue'

defineOptions({
  name: 'ThemeSetting',
})
const appStore = useAppStore()
</script>
