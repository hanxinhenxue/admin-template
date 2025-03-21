<template>
  <hover-container class="h-full w-40px" tooltip-content="内容全屏" @click="appStore.toggleFullContent">
    <n-icon size="20" class="cursor-pointer">
      <SvgIcon v-if="appStore.fullContent" icon="fluent:full-screen-minimize-20-filled" />
      <SvgIcon v-else icon="fluent:full-screen-maximize-20-filled" />
    </n-icon>
  </hover-container>
</template>

<script setup lang="ts">
import { useAppStore } from '@/store'

defineOptions({ name: 'ContentFullScreen' })

const appStore = useAppStore()
</script>
