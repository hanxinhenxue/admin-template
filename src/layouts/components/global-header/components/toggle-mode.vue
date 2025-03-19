<template>
  <hover-container class="h-full w-40px" tooltip-content="主题模式" :inverted="themeStore.header.inverted" @click="handleSwitch">
    <n-icon size="24" class="cursor-pointer">
      <SvgIcon v-if="darkMode" icon="line-md:moon-filled-loop" />
      <SvgIcon v-else icon="line-md:moon-filled-to-sunny-filled-loop-transition" />
    </n-icon>
  </hover-container>
</template>

<script setup lang="ts">
import { useThemeStore } from '@/store'

defineOptions({
  name: 'ToggleMode',
})

const props = defineProps({
  // 是否动画
  animate: {
    type: Boolean,
    default: true,
  },
})

const themeStore = useThemeStore()
const darkMode = computed(() => themeStore.darkMode)

async function handleSwitch(event) {
  if (!props.animate) {
    themeStore.toggleDarkMode()
    return
  }
  const x = event.clientX
  const y = event.clientY
  const endRadius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))

  const transition = document.startViewTransition(() => {
    themeStore.toggleDarkMode(!darkMode.value)
  })

  await transition.ready

  const clipPath = [`circle(0px at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`]

  document.documentElement.animate(
    {
      clipPath: darkMode.value ? clipPath : [...clipPath].reverse(),
    },
    {
      duration: 300,
      easing: 'ease-in',
      pseudoElement: darkMode.value ? '::view-transition-new(root)' : '::view-transition-old(root)',
    },
  )
}
</script>

<style>
  ::view-transition-old(root),
  ::view-transition-new(root) {
    animation: none;
    mix-blend-mode: normal;
  }
  ::view-transition-old(root) {
    z-index: 9999;
  }
  ::view-transition-new(root) {
    z-index: 1;
  }
  .dark::view-transition-old(root) {
    z-index: 1;
  }
  .dark::view-transition-new(root) {
    z-index: 9999;
  }
</style>
