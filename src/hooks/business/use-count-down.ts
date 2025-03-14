import { useRafFn } from '@vueuse/core'
import { computed, onScopeDispose, ref } from 'vue'

/**
 * 倒计时
 *
 * @param seconds - 倒计时多少秒
 */
export default function useCountDown(seconds: number) {
  const FPS_PER_SECOND = 60

  const fps = ref(0)

  const count = computed(() => Math.ceil(fps.value / FPS_PER_SECOND))

  const isCounting = computed(() => fps.value > 0)

  const { pause, resume } = useRafFn(
    () => {
      if (fps.value > 0) {
        fps.value -= 1
      }
      else {
        pause()
      }
    },
    { immediate: false },
  )

  function start(updateSeconds: number = seconds) {
    fps.value = FPS_PER_SECOND * updateSeconds
    resume()
  }

  function stop() {
    fps.value = 0
    pause()
  }

  onScopeDispose(() => {
    pause()
  })

  return {
    count,
    isCounting,
    start,
    stop,
  }
}
