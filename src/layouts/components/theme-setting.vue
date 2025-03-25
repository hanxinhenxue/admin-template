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
      <template #footer>
        <n-space w-full justify="space-between">
          <n-button type="error" ghost @click="resetHandle">重置配置</n-button>
          <n-button type="primary" @click="copyHandle">复制配置</n-button>
        </n-space>
      </template>
    </n-drawer-content>
  </n-drawer>
</template>

<script setup lang="ts">
import { useAppStore, useThemeStore } from '@/store'
import DarkMode from './dark-mode.vue'
import LayoutMode from './layout-mode.vue'
import PageFun from './page-fun.vue'
import ThemeColor from './theme-color.vue'
import { useClipboard } from '@vueuse/core'

defineOptions({
  name: 'ThemeSetting',
})
const appStore = useAppStore()
const themeStore = useThemeStore()

function resetHandle() {
  themeStore.resetThemeStore()
  setTimeout(() => {
    window.$message?.success('重置成功!');
  }, 50)
}
const settings = ref(themeStore.settingsJson)
const { copy, isSupported } = useClipboard()
async function copyHandle() {
  if (!isSupported) return window.$message?.error('您的浏览器不支持复制')
  try {
    await copy(settings.value);
    window.$message?.success('复制成功，请到settings/theme.ts中替换！')
  } catch (error) {
    window.$message?.error(`复制失败:${error}` )
  }
}
</script>
