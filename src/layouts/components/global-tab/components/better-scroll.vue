<template>
  <div ref="bsWrap" class="h-full text-left">
    <div ref="bsContent" class="inline-block" :class="{ 'h-full': !isScrollY }">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import BScroll from '@better-scroll/core'
import { useElementSize } from '@vueuse/core'

defineOptions({ name: 'BetterScroll' })

const props = defineProps({
  options: {
    type: Object,
    default: () => ({}),
  },
})

const bsWrap = ref()
const instance = ref()
const bsContent = ref()
const isScrollY = computed(() => Boolean(props.options.scrollY))

function initBetterScroll() {
  if (!bsWrap.value)
    return
  instance.value = new BScroll(bsWrap.value, props.options)
}

// 滚动元素发生变化，刷新BS
const { width: wrapWidth } = useElementSize(bsWrap)
const { width, height } = useElementSize(bsContent)
watch([() => wrapWidth.value, () => width.value, () => height.value], () => {
  if (instance.value) {
    instance.value.refresh()
  }
})

onMounted(() => {
  initBetterScroll()
})

defineExpose({ instance })
</script>

<style scoped></style>
