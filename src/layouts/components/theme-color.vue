<template>
  <n-divider title-placement="center">
    主题颜色
  </n-divider>
  <div class="flex-col items-stretch gap-16px">
    <SettingItem label="主色">
      <n-color-picker class="w-90px" :value="themeStore.themeColors.primary" :show-alpha="false" :swatches="themeStore.themeColorList" @update:value="themeStore.setThemeColor" />
    </SettingItem>
    <SettingItem label="信息色">
      <template #suffix>
        <n-checkbox v-model:checked="themeStore.isInfoFollowPrimary">
          跟随主色
        </n-checkbox>
      </template>
      <n-color-picker class="w-90px" :disabled="themeStore.isInfoFollowPrimary" :value="themeStore.themeColors.info" :show-alpha="false" :swatches="themeStore.themeColorList" @update:value="updateOtherColor($event, 'info')" />
    </SettingItem>
    <SettingItem label="成功色">
      <n-color-picker class="w-90px" :value="themeStore.themeColors.success" :show-alpha="false" :swatches="themeStore.themeColorList" @update:value="updateOtherColor($event, 'success')" />
    </SettingItem>
    <SettingItem label="警告色">
      <n-color-picker class="w-90px" :value="themeStore.themeColors.warning" :show-alpha="false" :swatches="themeStore.themeColorList" @update:value="updateOtherColor($event, 'warning')" />
    </SettingItem>
    <SettingItem label="错误色">
      <n-color-picker class="w-90px" :value="themeStore.themeColors.error" :show-alpha="false" :swatches="themeStore.themeColorList" @update:value="updateOtherColor($event, 'error')" />
    </SettingItem>
  </div>
</template>

<script setup lang="ts">
import { useThemeStore } from '@/store'
import SettingItem from './setting-item.vue'

defineOptions({ name: 'ThemeColor' })

const themeStore = useThemeStore()

function updateOtherColor(color: string, key: 'info' | 'success' | 'warning' | 'error') {
  themeStore.setOtherColor(key, color)
}
</script>
