<template>
  <n-divider title-placement="center">
    主题模式
  </n-divider>
  <div class="flex-col items-stretch gap-16px">
    <div class="flex-inline items-center justify-center">
      <n-tabs type="segment" animated @update:value="toggleMode">
        <n-tab name="light">
          <SvgIcon icon="mdi:white-balance-sunny" />
        </n-tab>
        <n-tab name="dark">
          <SvgIcon icon="mdi:moon-waning-crescent" />
        </n-tab>
      </n-tabs>
    </div>
    <transition name="sider-inverted">
      <SettingItem v-if="!themeStore.darkMode" label="深色侧边栏">
        <n-switch v-model:value="themeStore.sider.inverted" />
      </SettingItem>
    </transition>
    <SettingItem label="灰色模式">
      <n-switch v-model:value="themeStore.grayscale" />
    </SettingItem>
    <SettingItem label="色弱模式">
      <n-switch v-model:value="themeStore.colourWeakness" />
    </SettingItem>
  </div>
</template>

<script setup lang="ts">
import { useThemeStore } from '@/store'
import SettingItem from './setting-item.vue'

defineOptions({ name: 'DarkMode' })

const themeStore = useThemeStore()
function toggleMode(mode: 'light' | 'dark') {
  themeStore.setDarkMode(mode === 'dark')
}
</script>

<style lang="scss" scoped>

</style>
