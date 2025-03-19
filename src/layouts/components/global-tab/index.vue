<template>
  <DarkModeContainer v-if="themeStore.tab.visible" class="tab-container">
    <div ref="bsWrapper" class="flex-1 overflow-hidden" :style="{ height: `${tabHeight}px` }">
      <BetterScroll ref="bsScroll" :options="{ scrollX: true, scrollY: false, click: false }">
        <div ref="tabRef" class="h-full flex pr-18px" :class="mode === 'chrome' ? 'flex items-end' : 'gap-12px flex-center'">
          <TabItem
            v-for="item in tabStore.tabs"
            :key="item.fullPath"
            :active="tabStore.activeTab === item.fullPath"
            :mode="mode"
            :dark-mode="darkMode"
            :active-color="themeColor"
            :closable="!(tabStore.tabs.length === 1 || item.meta?.affix)"
            :tab-path="item.fullPath"
            @close="closeHandle"
            @toggle="toggleHandle"
            @contextmenu.prevent="handleContextMenu($event, item.fullPath)"
          >
            <SvgIcon :icon="item.meta.icon" :local-icon="item.meta.localIcon" />
            {{ item.meta.title }}
          </TabItem>
        </div>
        <ContextMenu
          :visible="dropdown.visible"
          :current-path="dropdown.currentPath"
          :affix="dropdown.affix"
          :x="dropdown.x"
          :y="dropdown.y"
          @update:visible="handleDropdownVisible"
        />
      </BetterScroll>
    </div>
    <ReloadButton />
  </DarkModeContainer>
  <div class="w-full" :style="{ height: `${tabHeight}px` }" />
</template>

<script setup>
import { useTabStore, useThemeStore } from '@/store'
import { useElementBounding } from '@vueuse/core'
import { storeToRefs } from 'pinia'
import { BetterScroll } from './components/better-scroll.vue'
import ContextMenu from './components/context-menu.vue'
import ReloadButton from './components/reload-button.vue'
import TabItem from './components/tab-item.vue'

defineOptions({
  name: 'GlobalTab',
})

const route = useRoute()
const themeStore = useThemeStore()
const tabStore = useTabStore()
const { darkMode, themeColor } = storeToRefs(theme)
const headerHeight = computed(() => themeStore.header.height)
const tabHeight = computed(() => themeStore.tab.height)
const mode = computed(() => themeStore.tab.mode)

const bsWrapper = ref()
const bsScroll = ref()
const tabRef = ref()
const { width: bsWrapperWidth, left: bsWrapperLeft } = useElementBounding(bsWrapper)

function handleScroll(clientX) {
  const currentX = clientX - bsWrapperLeft.value
  const deltaX = currentX - bsWrapperWidth.value / 2
  if (bsScroll.value) {
    const { maxScrollX, x: leftX } = bsScroll.value.instance
    const rightX = maxScrollX - leftX
    const update = deltaX > 0 ? Math.max(-deltaX, rightX) : Math.min(-deltaX, -leftX)
    bsScroll.value?.instance.scrollBy(update, 0, 300)
  }
}

function init() {
  tabStore.iniTabStore(route)
}

const closeHandle = path => tabStore.removeTab(path)
const toggleHandle = path => tabStore.handleClickTab(path)

async function getActiveTabClientX() {
  await nextTick()
  if (tabRef.value && tabRef.value.children.length && tabRef.value.children[tabStore.activeTabIndex]) {
    const activeTabElement = tabRef.value.children[tabStore.activeTabIndex]
    const { x, width } = activeTabElement.getBoundingClientRect()
    const clientX = x + width / 2
    setTimeout(() => {
      handleScroll(clientX)
    }, 50)
  }
}
const dropdown = reactive({
  visible: false,
  affix: false,
  x: 0,
  y: 0,
  currentPath: '',
})

function setDropdown(config) {
  Object.assign(dropdown, config)
}

let isClickContextMenu = false

function handleDropdownVisible(visible) {
  if (!isClickContextMenu) {
    setDropdown({ visible })
  }
}
/** 点击右键菜单 */
async function handleContextMenu(e, currentPath) {
  e.preventDefault()

  const { clientX, clientY } = e

  isClickContextMenu = true

  const DURATION = dropdown.visible ? 150 : 0

  setDropdown({ visible: false })

  setTimeout(() => {
    setDropdown({
      visible: true,
      x: clientX,
      y: clientY,
      currentPath,
    })
    isClickContextMenu = false
  }, DURATION)
}

watch(
  () => tabStore.activeTabIndex,
  () => {
    getActiveTabClientX()
  },
  {
    immediate: true,
  },
)
watch(
  () => route.fullPath,
  () => {
    tabStore.addTab(route)
    tabStore.setActiveTab(route.fullPath)
  },
  {
    immediate: true,
    deep: true,
  },
)
// 初始化
init()
</script>

<style lang="scss" scoped>
.tab-container {
    --t: v-bind(headerHeight);
    --h: v-bind(tabHeight);
    @apply pl-16px absolute left-0 w-full flex-center;
    top: calc(var(--t) * 1px);
    height: calc(var(--h) * 1px);
    box-shadow: 0 1px 2px rgba(0, 21, 41, 0.08);
}
</style>
