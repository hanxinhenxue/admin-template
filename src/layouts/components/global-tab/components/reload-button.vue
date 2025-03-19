<template>
  <hover-container class="h-full w-64px" tooltip-content="重新加载" placement="bottom-end" @click="handleRefresh">
    <SvgIcon icon="mdi-refresh" :class="{ 'animate-spin': loading }" :size="22" />
  </hover-container>
</template>

<script setup>
import { useLoading } from '@/hooks'
	import { useRouteStore } from '@/store'

defineOptions({ name: 'ReloadButton' })

const { reCacheRoute } = useRouteStore()
const route = useRoute()
const { loading, startLoading, endLoading } = useLoading()

async function handleRefresh() {
  startLoading()

  await reCacheRoute(route.name)

  setTimeout(() => {
    endLoading()
  }, 1000)
}
</script>

<style scoped></style>
