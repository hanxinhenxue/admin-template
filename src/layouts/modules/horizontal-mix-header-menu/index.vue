<template>
  <n-menu
    :value="mixMenuStore.activeFirstLevelMenuKey"
    accordion
    mode="horizontal"
    :responsive="true"
    :indent="18"
    :options="mixMenuStore.firstLevelMenus"
    :inverted="!themeStore.darkMode && themeStore.sider.inverted"
    @update:value="handleMenuSelect"
  />
</template>

<script setup lang="ts">
import { useMixMenuStore, useThemeStore } from '@/store'
import { isExternal } from '@/utils'

defineOptions({
  name: 'HorizontalMixHeaderMenu',
})

const router = useRouter()
const themeStore = useThemeStore()
const mixMenuStore = useMixMenuStore()

function handleMenuSelect(key: string) {
  if (isExternal(key)) {
    window.open(key)
  }
  else {
    mixMenuStore.setActiveFirstLevelMenuKey(key)
    if (!mixMenuStore.childLevelMenus?.length) {
      router.push(key)
    }
  }
}
</script>