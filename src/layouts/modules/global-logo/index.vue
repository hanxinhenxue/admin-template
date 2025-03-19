<template>
  <router-link class="h-60px flex-center truncate leading-60px" to="/">
    <SvgIcon local-icon="logo" style="width: 40px;height: 40px;" class="text-primary" />
    <h2 v-show="!appStore.siderCollapse" class="ml-10px flex-shrink-0 text-16 text-primary">
      {{ webTitle }}
    </h2>
  </router-link>
</template>

<script setup lang="ts">
import { useAppStore } from '@/store'

defineOptions({
  name: 'GlobalLogo',
})

const appStore = useAppStore()
const webTitle = ref(import.meta.env.VITE_TITLE)
</script>
