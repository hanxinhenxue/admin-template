<template>
  <n-breadcrumb class="px-12px">
    <n-breadcrumb-item v-for="item in route.matched.filter((item) => !!item.meta?.title)" :key="item.path" @click="handleBreadClick(item.path)">
      <span class="flex-center">
        <component :is="useSvgIcon(item.meta)" v-if="themeStore.header.breadcrumb.showIcon" class="mr-4px" />
        {{ item.meta.title }}
      </span>
    </n-breadcrumb-item>
  </n-breadcrumb>
</template>

<script setup lang="ts">
import { useSvgIcon } from '@/hooks'
import { useThemeStore } from '@/store'

defineOptions({ name: 'BreadCrumb' })

const router = useRouter()
const route = useRoute()
const themeStore = useThemeStore()

function handleBreadClick(path: string) {
  if (path === route.path)
    return
  router.push(path)
}
</script>
