<template>
  <n-menu
    ref="menu"
    :value="mixMenuStore.selectedKey"
    accordion
    :indent="18"
    :collapsed-icon-size="22"
    :collapsed-width="themeStore.sider.collapsedWidth"
    :options="mixMenuStore.childLevelMenus"
    :inverted="!themeStore.darkMode && themeStore.sider.inverted"
    @update:value="handleMenuSelect"
  />
</template>

<script setup lang="ts">
import type { MenuInst } from 'naive-ui'
import { useMixMenuStore, useThemeStore } from '@/store'
import { isExternal } from '@/utils'

defineOptions({
  name: 'HorizontalMixAsideMenu',
})

const router = useRouter()
const curRoute = useRoute()
const themeStore = useThemeStore()
const mixMenuStore = useMixMenuStore()

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
