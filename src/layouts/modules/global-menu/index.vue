<template>
  <n-menu
    ref="menu"
    v-model:value="activeKey"
    accordion
    :mode
    :responsive="mode === 'horizontal'"
    :indent="18"
    :collapsed-icon-size="22"
    :collapsed-width="themeStore.sider.collapsedWidth"
    :options="routeStore.menuOptions"
    :inverted="!themeStore.darkMode && themeStore.sider.inverted"
    @update:value="handleMenuSelect"
  />
</template>

<script setup lang="ts">
import type { MenuInst } from 'naive-ui'
import { useRouteStore, useThemeStore } from '@/store'
import { isExternal } from '@/utils'

defineOptions({
  name: 'GlobalMenu',
})

const { mode = 'vertical' } = defineProps<Props>()

interface Props {
  mode?: 'horizontal' | 'vertical'
}

const router = useRouter()
const curRoute = useRoute()
const themeStore = useThemeStore()
const routeStore = useRouteStore()
const activeKey = computed(() => {
  const { activeMenu } = curRoute.meta
  const name = curRoute.name as string
  return activeMenu || name
})

const menuEl = useTemplateRef<MenuInst>('menu')
watch(curRoute, async () => {
  await nextTick()
  menuEl.value?.showOption()
})

function handleMenuSelect(key: string) {
  if (isExternal(key)) {
    window.open(key)
  }
  else {
    router.push(key)
  }
}
</script>

<style lang="scss" scoped>

</style>
