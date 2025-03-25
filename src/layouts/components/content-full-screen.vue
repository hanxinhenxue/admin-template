<template>
  <hover-container class="h-full w-40px" tooltip-content="内容全屏" @click="setContent">
    <n-icon size="20" class="cursor-pointer">
      <SvgIcon v-if="isFullscreen" icon="fluent:full-screen-minimize-20-filled" />
      <SvgIcon v-else icon="fluent:full-screen-maximize-20-filled" />
    </n-icon>
  </hover-container>
</template>

<script setup lang="ts">
import { useAppStore } from '@/store'
import { useFullscreen } from '@vueuse/core'

defineOptions({ name: 'ContentFullScreen' })

const appStore = useAppStore()
const { isFullscreen, enter, exit } = useFullscreen()

function setContent() {
  if (!isFullscreen.value) {
    enter()
    appStore.setFullContent(true)
  }
  else {
    exit()
    appStore.setFullContent(false)
  }
}
</script>
