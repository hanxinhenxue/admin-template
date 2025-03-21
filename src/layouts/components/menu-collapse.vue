<template>
  <hover-container class="h-full w-40px" @click="appStore.toggleSiderCollapse">
    <n-icon class="cursor-pointer" size="20">
      <SvgIcon v-if="appStore.siderCollapse" icon="line-md:menu-fold-right" />
      <SvgIcon v-else icon="line-md:menu-fold-left" />
    </n-icon>
  </hover-container>
</template>

<script setup lang="ts">
import { useAppStore } from '@/store'

defineOptions({ name: 'MenuCollapse' })
const appStore = useAppStore()
</script>
