<template>
  <hover-container class="h-full w-40px" :tooltip-content="!appStore.mixSiderFixed ? '取消固定' : '固定'" @click="appStore.toggleMixSiderFixed">
    <n-icon size="20" class="cursor-pointer">
      <SvgIcon v-if="!appStore.mixSiderFixed" icon="mdi-pin-off" />
      <SvgIcon v-else icon="mdi-pin" />
    </n-icon>
  </hover-container>
</template>

<script setup lang="ts">
import { useAppStore } from '@/store'

defineOptions({ name: 'PinToggle' })

const appStore = useAppStore()
</script>
