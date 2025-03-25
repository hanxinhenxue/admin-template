<template>
  <DarkModeContainer v-if="!appStore.fullContent" class="flex-shrink-0" :style="{ height: `${themeStore.footer.height}px` }">
    <footer class="wh-full flex-center">
      Copyright
    </footer>
  </DarkModeContainer>
</template>

<script setup lang="ts">
import { useAppStore, useThemeStore } from '@/store'

defineOptions({ name: 'GlobalFooter' })
const themeStore = useThemeStore()
const appStore = useAppStore()
</script>
