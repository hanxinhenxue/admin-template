import { useRouteStore } from '@/store'
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'

/**
 * @description 混合模式的菜单
 */
export function useMixMenu() {
  const route = useRoute()
  const routeStore = useRouteStore()

  const selectedKey = computed(() => {
    const { activeMenu } = route.meta
    const name = route.fullPath as string
    return activeMenu || name
  })

  const activeFirstLevelMenuKey = ref('')
  function setActiveFirstLevelMenuKey(key: string) {
    activeFirstLevelMenuKey.value = key
  }

  function getActiveFirstLevelMenuKey() {
    const [, firstLevelRouteName] = selectedKey.value.split('/')

    setActiveFirstLevelMenuKey(`/${firstLevelRouteName}`)
  }

  const firstLevelMenus = computed(() =>
    routeStore.menuOptions.map((menu) => {
      const { children: _, ...rest } = menu

      return rest
    }),
  )

  const childLevelMenus = computed(() => routeStore.menuOptions.find(menu => menu.key === activeFirstLevelMenuKey.value)?.children || [])

  const isActiveFirstLevelMenuHasChildren = computed(() => {
    if (!activeFirstLevelMenuKey.value) {
      return false
    }

    const findItem = routeStore.menuOptions.find(item => item.key === activeFirstLevelMenuKey.value)

    return Boolean(findItem?.children?.length)
  })

  watch(
    () => route.fullPath,
    () => {
      getActiveFirstLevelMenuKey()
    },
    { immediate: true },
  )

  return {
    selectedKey,
    firstLevelMenus,
    childLevelMenus,
    activeFirstLevelMenuKey,
    getActiveFirstLevelMenuKey,
    isActiveFirstLevelMenuHasChildren,
    setActiveFirstLevelMenuKey,
  }
}
