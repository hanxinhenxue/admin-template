<template>
  <div class="flex-center flex-wrap gap-x-32px gap-y-16px">
    <div
      v-for="item in themeStore.layout.modeList"
      :key="item.value"
      class="flex cursor-pointer border-2px rounded-6px border-solid hover:border-primary"
      :class="[mode === item.value ? 'border-primary' : 'border-transparent']"
      @click="handleChangeMode(item.value)"
    >
      <n-tooltip placement="bottom">
        <template #trigger>
          <div
            class="h-64px w-96px gap-6px rd-4px p-6px shadow dark:shadow-coolGray-5"
            :class="[item.value.includes('vertical') ? 'flex' : 'flex-col']"
          >
            <slot :name="item.value" />
          </div>
        </template>
        {{ item.label }}
      </n-tooltip>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useThemeStore } from '@/store'

defineOptions({ name: 'ModeCard' })
const { mode = 'vertical', disabled = false } = defineProps<Props>()
const emit = defineEmits<Emits>()
const themeStore = useThemeStore()
interface Props {
  mode?: string
  disabled?: boolean
}

interface Emits {
  (e: 'update:mode', mode: string): void
}

function handleChangeMode(mode: string) {
  if (disabled)
    return
  emit('update:mode', mode)
}
</script>
