<template>
  <n-dropdown :show="dropdownVisible" :options="options" placement="bottom-start" :x="x" :y="y" @clickoutside="hide" @select="handleDropdown" />
</template>

<script setup lang="ts">
import { useSvgIcon } from '@/hooks'
import { useAppStore, useTabStore } from '@/store'

defineOptions({ name: 'ContextMenu' })

const { visible = false, currentPath = '', x = 0, y = 0 } = defineProps<Props>()

const emit = defineEmits(['update:visible'])

interface Props {
  visible?: boolean
  currentPath?: string
  x?: number
  y?: number
}

const app = useAppStore()
const tab = useTabStore()

const dropdownVisible = computed({
  get() {
    return visible
  },
  set(visible) {
    emit('update:visible', visible)
  },
})

function hide() {
  dropdownVisible.value = false
}

const options = computed(() => [
  {
    label: '重新加载',
    key: 'reload-current',
    disabled: currentPath !== tab.activeTab,
    icon: useSvgIcon({ icon: 'ant-design:reload-outlined' }),
  },
  {
    label: '关闭',
    key: 'close-current',
    disabled: tab.tabs.length === 1,
    icon: useSvgIcon({ icon: 'ant-design:close-outlined' }),
  },
  {
    label: '关闭其他',
    key: 'close-other',
    icon: useSvgIcon({ icon: 'ant-design:column-width-outlined' }),
  },
  {
    label: '关闭左侧',
    key: 'close-left',
    icon: useSvgIcon({ icon: 'mdi:format-horizontal-align-left' }),
  },
  {
    label: '关闭右侧',
    key: 'close-right',
    icon: useSvgIcon({ icon: 'mdi:format-horizontal-align-right' }),
  },
  {
    label: '关闭所有',
    key: 'close-all',
    icon: useSvgIcon({ icon: 'ant-design:line-outlined' }),
  },
])

const actionMap = new Map([
  [
    'reload-current',
    () => {
      app.reloadPage()
    },
  ],
  [
    'close-current',
    () => {
      tab.removeTab(currentPath)
    },
  ],
  [
    'close-other',
    () => {
      tab.clearTab([currentPath])
    },
  ],
  [
    'close-left',
    () => {
      tab.clearLeftTab(currentPath)
    },
  ],
  [
    'close-right',
    () => {
      tab.clearRightTab(currentPath)
    },
  ],
  [
    'close-all',
    () => {
      tab.clearAllTab()
    },
  ],
])

function handleDropdown(optionKey) {
  const key = optionKey
  const actionFunc = actionMap.get(key)
  if (actionFunc) {
    actionFunc()
  }
  hide()
}
</script>

<style scoped></style>
