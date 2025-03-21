<template>
  <GlobalLogo :visible="!appStore.siderCollapse" />
  <GlobalMenu />
</template>

<script setup lang="ts">
import { useAppStore } from '@/store'
import GlobalLogo from '../global-logo/index.vue'
import GlobalMenu from '../global-menu/index.vue'

defineOptions({
  name: 'GlobalSider',
})
const appStore = useAppStore()
</script>

<style lang="scss" scoped>

</style>
