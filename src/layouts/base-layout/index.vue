<template>
  <n-layout has-sider wh-full>
    <n-layout-sider
      bordered
      collapse-mode="width"
      :collapsed-width="themeStore.sider.collapsedWidth"
      :width="themeStore.sider.width"
      :native-scrollbar="false"
      :collapsed="appStore.siderCollapse"
      :inverted="!themeStore.darkMode && themeStore.sider.inverted"
    >
      <GlobalSider />
    </n-layout-sider>
    <main class="relative flex flex-col flex-1 overflow-hidden">
      <GlobalHeader />
      <GlobalTab />
      <GlobalContent />
    </main>
  </n-layout>
</template>

<script setup lang="ts">
import { useAppStore, useThemeStore } from '@/store'
import GlobalContent from '../components/global-content/index.vue'
import GlobalHeader from '../components/global-header/index.vue'
import GlobalSider from '../components/global-sider/index.vue'
import GlobalTab from '../components/global-tab/index.vue'

defineOptions({
  name: 'BaseLayout',
})

const themeStore = useThemeStore()
const appStore = useAppStore()
</script>

<style lang="scss" scoped>

</style>
