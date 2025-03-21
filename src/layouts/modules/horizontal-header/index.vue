<template>
  <DarkModeContainer :style="{ height: `${themeStore.header.height}px` }">
    <header class="header-container relative z-1 box-border wh-full flex items-center px-12px">
      <div h-full flex-shrink-0 pr-10px>
        <GlobalLogo />
      </div>
      <div h-full flex-center flex-1 overflow-hidden>
        <GlobalMenu mode="horizontal" />
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
import { useThemeStore } from '@/store'
import FullScreen from '../../components/full-screen.vue'
import ThemeSetting from '../../components/theme-setting.vue'
import ToggleMode from '../../components/toggle-mode.vue'
import UserAvatar from '../../components/user-avatar.vue'
import GlobalLogo from '../global-logo/index.vue'
import GlobalMenu from '../global-menu/index.vue'

defineOptions({
  name: 'HorizontalHeader',
})

const themeStore = useThemeStore()
</script>

  <style lang="scss" scoped>
      .header-container {
          box-shadow: 0 1px 2px rgb(0, 21, 41, 0.08);
      }
  </style>
