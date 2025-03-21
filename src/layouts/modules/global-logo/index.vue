<template>
  <router-link class="h-60px flex-center truncate" :class="themeStore.layout.mode === 'horizontal' ? 'h-full' : 'h-60px'" to="/">
    <SvgIcon local-icon="logo" :size="40" class="text-primary" />
    <h2 v-show="visible" class="ml-10px flex-shrink-0 text-16 text-primary">
      {{ webTitle }}
    </h2>
  </router-link>
</template>

<script setup lang="ts">
import { useThemeStore } from '@/store'

defineOptions({
  name: 'GlobalLogo',
})

const { visible = true } = defineProps<Props>()

interface Props {
  // 是否显示网站标题
  visible?: boolean
}

const themeStore = useThemeStore()
const webTitle = ref(import.meta.env.VITE_TITLE)
</script>
