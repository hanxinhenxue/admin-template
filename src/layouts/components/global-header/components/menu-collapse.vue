<template>
  <hover-container class="h-full w-40px" :inverted="themeStore.header.inverted" @click="appStore.toggleSiderCollapse">
    <n-icon class="cursor-pointer" size="20">
      <SvgIcon v-if="appStore.collapsed" icon="line-md:menu-fold-right" />
      <SvgIcon v-else icon="line-md:menu-fold-left" />
    </n-icon>
  </hover-container>
</template>

<script setup>
import { useAppStore, useThemeStore } from '@/store'

defineOptions({
  name: 'MenuCollapse',
})
const appStore = useAppStore()
const themeStore = useThemeStore()
</script>
