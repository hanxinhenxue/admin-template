<script setup lang="ts">
import { themeSettings } from '@/settings'

defineOptions({
  name: 'AppLoading',
})

const websitTitle = ref<string>(import.meta.env.VITE_NAME)

const lodingClasses = ref([
  'left-0 top-0',
  'left-0 bottom-0 animate-delay-500',
  'right-0 top-0 animate-delay-1000',
  'right-0 bottom-0 animate-delay-1500',
])

function addThemeColorCssVars() {
  const themeColor = themeSettings.themeColor

  const cssVars = `--primary-color: ${themeColor}`
  document.documentElement.style.cssText = cssVars
}

addThemeColorCssVars()
</script>

<template>
  <div class="fixed wh-full flex-center flex-col">
    <SvgIcon local-icon="logo" size="128" class="text-primary" />
    <div class="my-36px h-56px w-56px">
      <div class="relative h-full animate-spin">
        <div v-for="(item, index) in lodingClasses" :key="index" class="abs h-16px w-16px animate-pulse rounded-8px bg-primary" :class="item" />
      </div>
    </div>
    <h2 class="text-28px text-#646464 font-500">
      {{ websitTitle }}
    </h2>
  </div>
</template>
