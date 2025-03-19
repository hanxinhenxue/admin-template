<template>
  <RouterView v-slot="{ Component, route }">
    <Transition
      :name="theme.pageAnimateMode"
      mode="out-in"
      :appear="true"
      @before-leave="appStore.setContentXScrollable(true)"
      @after-enter="appStore.setContentXScrollable(false)"
    >
      <KeepAlive :include="routeStore.cacheRoutes as string[]">
        <component
          :is="Component"
          v-if="appStore.reloadFlag"
          :key="route.fullPath"
          :class="{ 'p-16px': showPadding }"
          class="flex-grow bg-#f6f9f8 transition duration-300 ease-in-out dark:bg-#101014"
        />
      </KeepAlive>
    </Transition>
  </RouterView>
</template>

<script setup lang="ts">
import { useAppStore, useRouteStore, useThemeStore } from '@/store'

defineOptions({
  name: 'GlobalContent',
})

withDefaults(defineProps<Props>(), {
  showPadding: true,
})

interface Props {
  showPadding?: boolean
}

const appStore = useAppStore()
const theme = useThemeStore()
const routeStore = useRouteStore()
</script>

<style></style>
