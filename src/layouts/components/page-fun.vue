<template>
  <n-divider title-placement="center">
    页面功能
  </n-divider>
  <transition-group tag="div" name="setting-list" class="flex-col items-stretch gap-16px">
    <SettingItem key="0" label="页面切换动画">
      <n-switch v-model:value="themeStore.page.animate" />
    </SettingItem>
    <SettingItem v-if="themeStore.page.animate" key="1" label="页面切换动画类型">
      <n-select
        v-model:value="themeStore.page.animateMode"
        class="w-120px"
        size="small"
        :options="themeStore.page.animateModeList"
      />
    </SettingItem>
    <SettingItem key="2" label="头部高度">
      <n-input-number
        v-model:value="themeStore.header.height"
        class="w-120px"
        size="small"
        :step="1"
        :min="35"
      />
    </SettingItem>
    <SettingItem key="3" label="显示面包屑">
      <n-switch v-model:value="themeStore.header.breadcrumb.visible" />
    </SettingItem>
    <SettingItem v-if="themeStore.header.breadcrumb.visible" key="4" label="显示面包屑图标">
      <n-switch v-model:value="themeStore.header.breadcrumb.showIcon" />
    </SettingItem>
    <SettingItem key="5" label="显示标签栏">
      <n-switch v-model:value="themeStore.tab.visible" />
    </SettingItem>
    <SettingItem v-if="themeStore.tab.visible" key="6" label="标签栏高度">
      <n-input-number
        v-model:value="themeStore.tab.height"
        class="w-120px"
        size="small"
        :step="1"
      />
    </SettingItem>
    <SettingItem v-if="themeStore.tab.visible" key="7" label="标签栏风格">
      <n-select
        v-model:value="themeStore.tab.mode"
        class="w-120px"
        size="small"
        :options="themeStore.tab.modeList"
      />
    </SettingItem>
    <SettingItem key="8" label="侧边栏宽度">
      <n-input-number
        v-model:value="themeStore.sider.width"
        class="w-120px"
        size="small"
        :step="1"
      />
    </SettingItem>
    <SettingItem key="9" label="侧边栏折叠宽度">
      <n-input-number
        v-model:value="themeStore.sider.collapsedWidth"
        class="w-120px"
        size="small"
        :step="1"
      />
    </SettingItem>
    <SettingItem key="10" label="显示底部">
      <n-switch v-model:value="themeStore.footer.visible" />
    </SettingItem>
    <SettingItem v-if="themeStore.footer.visible" key="11" label="底部高度">
      <n-input-number
        v-model:value="themeStore.footer.height"
        class="w-120px"
        size="small"
        :step="1"
      />
    </SettingItem>
    <SettingItem v-if="themeStore.footer.visible" key="12" label="底部固定">
      <n-switch v-model:value="themeStore.footer.fixed" />
    </SettingItem>
    <SettingItem key="13" label="显示全屏水印">
      <n-switch v-model:value="themeStore.watermark.visible" />
    </SettingItem>
    <SettingItem v-if="themeStore.watermark.visible" key="14" label="水印文本">
      <n-input
        v-model:value="themeStore.watermark.text"
        autosize
        type="text"
        size="small"
        class="w-120px"
        placeholder="SoybeanAdmin"
      />
    </SettingItem>
  </transition-group>
</template>

<script setup lang="ts">
import { useThemeStore } from '@/store'
import SettingItem from './setting-item.vue'

defineOptions({ name: 'PageFun' })
const themeStore = useThemeStore()
</script>

<style lang="scss" scoped>

</style>
