<template>
  <DarkModeContainer v-if="!appStore.fullContent" :style="{ height: `${themeStore.header.height}px` }">
    <header class="header-container absolute left-0 top-0 z-2 wh-full flex-between">
      <div class="h-full flex flex-1 items-center">
        <MenuCollapse />
        <BreadCrumb v-if="themeStore.header.breadcrumb.visible && !appStore.isMobile" />
      </div>
      <div class="h-full flex-center">
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
import MenuCollapse from '../../components/menu-collapse.vue'
import ThemeSetting from '../../components/theme-setting.vue'
import ToggleMode from '../../components/toggle-mode.vue'
import UserAvatar from '../../components/user-avatar.vue'

defineOptions({
  name: 'LayoutHeader',
})

const themeStore = useThemeStore()
const appStore = useAppStore()
</script>

<style lang="scss" scoped>
    .header-container {
        box-shadow: 0 1px 2px rgb(0, 21, 41, 0.08);
    }
</style>
