<template>
  <aside
    v-if="!appStore.fullContent"
    class="mix-aside" :class="[!themeStore.darkMode && themeStore.sider.inverted ? 'inverted' : '']"
    @mouseleave="leaveHandle"
  >
    <div class="relative z-2 flex flex-col overflow-hidden all" :style="{ width: `${firstMenuWidth}px` }">
      <GlobalLogo :visible="false" />
      <div class="first-level-menu">
        <div
          v-for="item in mixMenuStore.firstLevelMenus" :key="item.key" class="mix-menu-item"
          :class="[themeStore.darkMode ? 'bg--dark' : 'bg--light', isActived(item.key) ? 'selected' : '']"
          @click="handleMenuSelect(item?.key)"
        >
          <component :is="item.icon" :size="20" />
          <div class="mix-menu-item__label" :class="appStore.siderCollapse ? 'h-0' : 'h-20px'">
            {{ item.label }}
          </div>
        </div>
      </div>
      <div
        class="h-36px w-full flex-center flex-shrink-0 cursor-pointer dark:hover:bg-#333"
        :class="`${!themeStore.darkMode && themeStore.sider.inverted ? 'hover:bg-primary' : 'hover:bg-#f6f6f6'}`"
        @click="appStore.toggleSiderCollapse"
      >
        <n-icon size="20">
          <SvgIcon v-if="appStore.siderCollapse" icon="line-md:menu-fold-right" />
          <SvgIcon v-else icon="line-md:menu-fold-left" />
        </n-icon>
      </div>
    </div>
    <div class="transition duration-300" :class="[!appStore.mixSiderFixed ? `w-${secondLevelWidth}px` : 'w-0']">
      <div class="second-level-menu" :class="secondLevelClass">
        <div class="wh-full flex-col">
          <header class="h-60px flex items-center">
            <h2 class="w-full truncate px-12px text-left text-16 text-primary font-bold leading-60px">
              {{ webTitle }}
            </h2>
            <PinToggle />
          </header>
          <n-menu
            :value="mixMenuStore.selectedKey" class="flex-1" accordion :indent="18"
            :options="mixMenuStore.childLevelMenus" :inverted="!themeStore.darkMode && themeStore.sider.inverted"
            @update:value="handleMenuChildSelect"
          />
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { useBoolean } from '@/hooks'
import { useAppStore, useMixMenuStore, useThemeStore } from '@/store'
import { getColorPalettes, isExternal } from '@/utils'
import PinToggle from '../../components/pin-toggle.vue'
import GlobalLogo from '../global-logo/index.vue'

defineOptions({ name: 'MixAside' })

const { bool, setBool } = useBoolean()
const themeStore = useThemeStore()
const appStore = useAppStore()
const mixMenuStore = useMixMenuStore()
const themeColor = themeStore.themeColor
const webTitle = ref(import.meta.env.VITE_TITLE)

const bgColor = computed(() => getColorPalettes(themeColor, themeStore.darkMode)[2])

const lastActiveKey = ref(mixMenuStore.activeFirstLevelMenuKey)
const router = useRouter()
const firstMenuWidth = computed(() => appStore.siderCollapse ? themeStore.sider.mixCollapsedWidth : themeStore.sider.mixWidth)
const secondLevelWidth = computed(() => {
  return mixMenuStore.childLevelMenus?.length > 0 ? `${themeStore.sider.mixChildMenuWidth}` : '0'
})
const secondLevelClass = computed(() => {
  if (mixMenuStore.childLevelMenus.length > 0) {
    if (!appStore.mixSiderFixed) {
      return `no-fixed`
    }
    else {
      if (!bool.value) {
        return `no-w`
      }
      else {
        return `h-fixed`
      }
    }
  }
  else {
    return `no-w`
  }
})

function isActived(key: string | undefined | number) {
  if (key === undefined)
    return false
  if (typeof key === 'number') {
    return String(key).includes(String(mixMenuStore.activeFirstLevelMenuKey))
  }
  return key.includes(mixMenuStore.activeFirstLevelMenuKey)
}

function handleMenuSelect(key: string | undefined | number) {
  if (key === undefined)
    return
  const formatKey = typeof key === 'number' ? String(key) : key
  if (isExternal(formatKey)) {
    window.open(formatKey)
  }
  else {
    mixMenuStore.setActiveFirstLevelMenuKey(formatKey)
    nextTick(() => {
      if (mixMenuStore.childLevelMenus.length === 0) {
        lastActiveKey.value = formatKey
        router.push(formatKey)
      }
      else {
        setBool(true)
      }
    })
  }
}

function handleMenuChildSelect(key: string) {
  if (isExternal(key)) {
    window.open(key)
  }
  else {
    lastActiveKey.value = mixMenuStore.activeFirstLevelMenuKey
    router.push(key)
  }
}

function leaveHandle() {
  setBool(false)
  if (appStore.mixSiderFixed) {
    mixMenuStore.setActiveFirstLevelMenuKey(lastActiveKey.value)
  }
}
</script>

<style scoped lang="scss">
.mix-aside {
  @apply flex relative;
  box-shadow: 2px 0 8px 0 rgb(29, 35, 41, 0.05);
}

.first-level-menu {
  @apply flex-1 overflow-y-auto;
}

.first-level-menu {
  scrollbar-width: thin;
  scrollbar-color: #e1e1e1 transparent;

  &::-webkit-scrollbar-thumb {
    background-color: #e1e1e1;
    border-radius: 8px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #e1e1e1;
    border-radius: 8px;
  }

  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  &::-webkit-scrollbar-track-piece {
    background-color: rgba(0, 0, 0, 0);
    border-radius: 0;
  }
}

.dark .first-level-menu {
  scrollbar-width: thin;
  scrollbar-color: #555 transparent;

  &::-webkit-scrollbar-thumb {
    background-color: #555;
    border-radius: 8px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #555;
    border-radius: 8px;
  }

  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  &::-webkit-scrollbar-track-piece {
    background-color: rgba(0, 0, 0, 0);
    border-radius: 0;
  }
}

.mix-menu-item {
  --c: v-bind(themeColor);
  --bg: v-bind(bgColor);
  @apply py-8px px-4px cursor-pointer mb-6px mx-4px flex-col flex-center rounded-8px;

  &__label {
    @apply truncate w-full text-12px pt-4px text-center;
    transition: height 0.3s ease-in-out;
  }

  &.selected {
    color: var(--c);
    border-color: var(--c);
    background-color: var(--bg);
  }

  &.bg--dark {
    &:not(.selected):hover {
      background: rgba(255, 255, 255, 0.09);
    }
  }

  &.bg--light {
    &:not(.selected):hover {
      background-color: #dee1e6;
    }
  }
}

.second-level-menu {
  --sw: v-bind(secondLevelWidth);
  --fw: v-bind(firstMenuWidth);
  @apply h-full bg-#fff dark:bg-#1c1c1c relative z-1 overflow-hidden;
  box-shadow: 2px 0 8px 0 rgb(29, 35, 41, 0.05);
  transition: width 0.3s ease-in-out;
  will-change: width;

  &.no-w {
    width: 0;
  }

  &.no-fixed {
    width: calc(var(--sw) * 1px);
  }

  &.h-fixed {
    width: calc(var(--sw) * 1px);
    left: calc(var(--fw) * 1px);
    @apply absolute z-12;
  }
}
</style>
