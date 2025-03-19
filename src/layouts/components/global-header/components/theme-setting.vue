<template>
  <hover-container class="h-full w-40px" tooltip-content="主题配置" :inverted="themeStore.header.inverted" @click="appStore.setDrawerVisible(true)">
    <n-icon size="24" class="cursor-pointer">
      <SvgIcon icon="majesticons:color-swatch-line" />
    </n-icon>
  </hover-container>

  <n-drawer :show="appStore.drawerVisible" display-directive="show" :width="330" @mask-click="appStore.setDrawerVisible(false)">
    <n-drawer-content title="主题配置" :native-scrollbar="false">
      <n-divider title-placement="center">
        主题模式
      </n-divider>
      <n-space vertical size="large">
        <div class="flex-between">
          <span>深色主题</span>
          <n-switch v-model:value="themeStore.darkMode" @update:value="themeStore.toggleDarkMode()">
            <template #checked>
              <SvgIcon icon="mdi:white-balance-sunny" />
            </template>
            <template #unchecked>
              <SvgIcon icon="mdi:moon-waning-crescent" />
            </template>
          </n-switch>
        </div>
        <div class="flex-between">
          <span>侧边栏深色</span>
          <n-switch :value="themeStore.sider.inverted" @update:value="themeStore.setSiderInverted" />
        </div>
        <div class="flex-between">
          <span>头部深色</span>
          <n-switch :value="themeStore.header.inverted" @update:value="themeStore.setHeaderInverted" />
        </div>
        <div class="flex-between">
          <span>灰度模式</span>
          <n-switch :value="themeStore.grayscale" @update:value="themeStore.setGrayscale" />
        </div>
      </n-space>
      <n-divider title-placement="center">
        系统主题
      </n-divider>
      <n-grid :cols="8" :x-gap="8" :y-gap="12">
        <n-grid-item v-for="color in themeStore.themeColorList" :key="color" class="flex-x-center">
          <ColorCheckbox :color="color" :checked="color === themeStore.themeColor" @click="themeStore.setThemeColor(color)" />
        </n-grid-item>
      </n-grid>
      <n-space :vertical="true" class="pt-12px">
        <n-color-picker :value="themeStore.themeColor" :show-alpha="false" @update-value="themeStore.setThemeColor" />
      </n-space>
      <n-divider title-placement="center">
        界面显示
      </n-divider>
      <n-space vertical size="large">
        <div class="flex-between">
          <span>面包屑</span>
          <n-switch :value="themeStore.header.breadcrumb.visible" @update:value="themeStore.setHeaderCrumbVisible" />
        </div>
        <div class="flex-between">
          <span>面包屑图标</span>
          <n-switch :value="themeStore.header.breadcrumb.showIcon" @update:value="themeStore.setHeaderCrumbIconVisible" />
        </div>
        <div class="flex-between">
          <span>多页签</span>
          <n-switch :value="themeStore.tab.visible" @update:value="themeStore.setTabVisible" />
        </div>
        <div class="flex-between">
          <span>多页签风格</span>
          <n-select class="w-120px" size="small" :value="themeStore.tab.mode" :options="themeStore.tab.modeList" @update:value="themeStore.setTabMode" />
        </div>
        <div class="flex-between">
          <span>多页签缓存</span>
          <n-switch :value="themeStore.tab.isCache" @update:value="themeStore.setTabIsCache" />
        </div>
        <div class="flex-between">
          <span>页面切换动画</span>
          <n-switch :value="themeStore.page.animate" @update:value="themeStore.setPageIsAnimate" />
        </div>
        <div class="flex-between">
          <span>页面切换动画类型</span>
          <n-select
            class="w-120px"
            size="small"
            :value="themeStore.page.animateMode"
            :options="themeStore.page.animateModeList"
            @update:value="themeStore.setPageAnimateMode"
          />
        </div>
      </n-space>
    </n-drawer-content>
  </n-drawer>
</template>

<script setup lang="ts">
import { useAppStore, useThemeStore } from '@/store'
import ColorCheckbox from './color-checkbox.vue'

defineOptions({
  name: 'ThemeSetting',
})
const appStore = useAppStore()
const themeStore = useThemeStore()
</script>

<style lang="scss" scoped>

</style>
