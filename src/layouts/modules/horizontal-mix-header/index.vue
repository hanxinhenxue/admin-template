<template>
  <DarkModeContainer v-if="!appStore.fullContent" :style="{ height: `${themeStore.header.height}px` }">
    <header class="header-container relative z-2 box-border wh-full flex items-center px-12px">
      <div h-full flex-shrink-0 pr-10px>
        <GlobalLogo />
      </div>
      <div h-full flex-shrink-0 pr-10px>
        <MenuCollapse />
      </div>
      <div h-full flex-center flex-1 overflow-hidden>
        <HorizontalMixHeaderMenu mode="horizontal" />
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
import FullScreen from '../../components/full-screen.vue'
import MenuCollapse from '../../components/menu-collapse.vue'
import ThemeSetting from '../../components/theme-setting.vue'
import ToggleMode from '../../components/toggle-mode.vue'
import UserAvatar from '../../components/user-avatar.vue'
import GlobalLogo from '../global-logo/index.vue'
import HorizontalMixHeaderMenu from '../horizontal-mix-header-menu/index.vue'

defineOptions({
  name: 'HorizontalMixHeader',
})

const themeStore = useThemeStore()
const appStore = useAppStore()
</script>

  <style lang="scss" scoped>
      .header-container {
          box-shadow: 0 1px 2px rgb(0, 21, 41, 0.08);
      }
  </style>
