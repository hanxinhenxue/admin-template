<template>
  <n-menu
    :value="mixMenuStore.activeFirstLevelMenuKey"
    accordion
    :mode
    :responsive="mode === 'horizontal'"
    :indent="18"
    :collapsed-icon-size="22"
    :collapsed-width="themeStore.sider.collapsedWidth"
    :options="mixMenuStore.firstLevelMenus"
    :inverted="!themeStore.darkMode && themeStore.sider.inverted"
    @update:value="handleMenuSelect"
  />
</template>

<script setup lang="ts">
import { useThemeStore, useMixMenuStore } from '@/store'
import { isExternal } from '@/utils'

defineOptions({
  name: 'HorizontalMixHeaderMenu',
})

const { mode = 'vertical' } = defineProps<Props>()

interface Props {
  mode?: 'horizontal' | 'vertical'
}

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

<style lang="scss" scoped>

</style>
