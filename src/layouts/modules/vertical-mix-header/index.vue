<template>
  <DarkModeContainer v-if="!appStore.fullContent" :style="{ height: `${themeStore.header.height}px` }">
    <header class="header-container relative z-2 box-border wh-full flex items-center px-12px">
      <div class="h-full flex flex-1 items-center">
        <BreadCrumb v-if="themeStore.header.breadcrumb.visible && !appStore.isMobile" />
      </div>
      <div class="h-full flex-center flex-shrink-0">
        <ToggleMode />
        <FullScreen />
        <ThemeSetting />
        <UserAvatar />
      </div>
    </header>
  </DarkModeContainer>
</template>

<script lang="ts" setup>
import { useAppStore, useThemeStore } from '@/store'
import BreadCrumb from '../../components/bread-crumb.vue'
import FullScreen from '../../components/full-screen.vue'
import ThemeSetting from '../../components/theme-setting.vue'
import ToggleMode from '../../components/toggle-mode.vue'
import UserAvatar from '../../components/user-avatar.vue'

defineOptions({
  name: 'VerticalMixHeader',
})
const themeStore = useThemeStore()
const appStore = useAppStore()
</script>

    <style lang="scss" scoped>
        .header-container {
            box-shadow: 0 1px 2px rgb(0, 21, 41, 0.08);
        }
    </style>
