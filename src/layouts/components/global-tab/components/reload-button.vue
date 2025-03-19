<template>
	<hover-container class="w-64px h-full" tooltip-content="重新加载" placement="bottom-end" @click="handleRefresh">
		<SvgIcon icon="mdi-refresh" :class="{ 'animate-spin': loading }" size="22" />
	</hover-container>
</template>

<script setup>
	import { useRouteStore } from '@/store'
	import { useLoading } from '@/hooks'

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
