<template>
  <n-menu
    ref="menu"
    accordion
    :mode
    :responsive="mode === 'horizontal'"
    :indent="18"
    :collapsed-icon-size="22"
    :collapsed-width="themeStore.sider.collapsedWidth"
    :options="menuOptions"
    :value="activeKey"
    :inverted="!themeStore.darkMode && themeStore.sider.inverted"
    @update:value="handleMenuSelect"
  />
</template>

<script setup lang="ts">
import type { MenuInst, MenuOption } from 'naive-ui'
import type { RouteMeta, RouteRecordRaw } from 'vue-router'
import { useSvgIcon } from '@/hooks'
import { useRouteStore, useThemeStore } from '@/store'
import { isExternal, renderExtra } from '@/utils'

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

const menuOptions = computed<MenuOption[]>(() => {
  return routeStore.menus.map(item => getMenuItem(item)).sort((a, b) => a.order! - b.order!) as unknown as MenuOption[]
})

const menuEl = useTemplateRef<MenuInst>('menu')
watch(curRoute, async () => {
  await nextTick()
  menuEl.value?.showOption()
})

function resolvePath(basePath: string, path: string) {
  if (isExternal(path))
    return path
  return (
    `/${
      [basePath, path]
        .filter(path => !!path && path !== '/')
        .map(path => path.replace(/(^\/)|(\/$)/g, ''))
        .join('/')}`
  )
}
function getMenuItem(route: RouteRecordRaw, basePath = ''): App.Global.Menu {
  let menuItem: App.Global.Menu = {
    label: ((route.meta && route.meta.title) || route.name) as string,
    key: resolvePath(basePath, route.path) as string,
    icon: getIcon(route.meta),
    order: route.meta?.sort || 0,
    extra: renderExtra(route.meta),
  }

  const visibleChildren = route.children ? route.children.filter(item => item.name && !item.hidden) : []

  if (!visibleChildren.length)
    return menuItem
  if (visibleChildren.length === 1) {
    // 单个子路由处理
    const singleRoute = visibleChildren[0]
    if (route.singleShow) {
      const child = {
        label: (singleRoute.meta?.title || singleRoute.name) as string,
        key: resolvePath(menuItem.key, singleRoute.path),
        icon: getIcon(singleRoute.meta),
      }
      menuItem.children = [child]
    }
    else {
      menuItem = {
        ...menuItem,
        label: (singleRoute.meta?.title || singleRoute.name) as string,
        key: resolvePath(menuItem.key, singleRoute.path),
        icon: getIcon(singleRoute.meta),
      }
    }
    const visibleItems = singleRoute.children ? singleRoute.children.filter(item => item.name && !item.hidden) : []
    if (visibleItems.length === 1) {
      menuItem = getMenuItem(visibleItems[0], menuItem.key)
    }
    else if (visibleItems.length > 1) {
      menuItem.children = visibleItems.map(item => getMenuItem(item, menuItem.key)).sort((a, b) => a.order - b.order)
    }
  }
  else {
    menuItem.children = visibleChildren.map(item => getMenuItem(item, menuItem.key)).sort((a, b) => a.order - b.order)
  }
  return menuItem
}

function getIcon(meta: RouteMeta = {}) {
  const { icon, localIcon, image } = meta
  if (image) {
    return () => h('img', { src: image, style: meta?.imageStyle })
  }
  if (localIcon) {
    return useSvgIcon({ localIcon, ...meta })
  }
  if (icon) {
    return useSvgIcon({ icon, ...meta })
  }
}
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
