import type {
  BarSeriesOption,
  GaugeSeriesOption,
  LineSeriesOption,
  PictorialBarSeriesOption,
  PieSeriesOption,
  RadarSeriesOption,
  ScatterSeriesOption,
} from 'echarts/charts'
import type {
  DatasetComponentOption,
  GridComponentOption,
  LegendComponentOption,
  TitleComponentOption,
  ToolboxComponentOption,
  TooltipComponentOption,
} from 'echarts/components'
import { useThemeStore } from '@/store'
import { useElementSize } from '@vueuse/core'
import { BarChart, GaugeChart, LineChart, PictorialBarChart, PieChart, RadarChart, ScatterChart } from 'echarts/charts'
import {
  DatasetComponent,
  GridComponent,
  LegendComponent,
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  TransformComponent,
} from 'echarts/components'
import * as echarts from 'echarts/core'
import { LabelLayout, UniversalTransition } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'
import { computed, effectScope, nextTick, onScopeDispose, ref, watch } from 'vue'

export type ECOption = echarts.ComposeOption<
  | BarSeriesOption
  | LineSeriesOption
  | PieSeriesOption
  | ScatterSeriesOption
  | PictorialBarSeriesOption
  | RadarSeriesOption
  | GaugeSeriesOption
  | TitleComponentOption
  | LegendComponentOption
  | TooltipComponentOption
  | GridComponentOption
  | ToolboxComponentOption
  | DatasetComponentOption
>

echarts.use([
  TitleComponent,
  LegendComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  ToolboxComponent,
  BarChart,
  LineChart,
  PieChart,
  ScatterChart,
  PictorialBarChart,
  RadarChart,
  GaugeChart,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer,
])

interface ChartHooks {
  onRender?: (chart: echarts.ECharts) => void | Promise<void>
  onUpdated?: (chart: echarts.ECharts) => void | Promise<void>
  onDestroy?: (chart: echarts.ECharts) => void | Promise<void>
}

/**
 * 使用echarts
 * @description 通过使用useEcharts返回dom元素，更新option方法 、设置option方法
 * @param optionsFactory echarts配置项
 * @return domRef 绑定的dom元素，需要有宽高
 * @return updateOptions 更新指定配置项方法
 * @return setOptions 设置option方法
 */
export function useEcharts<T extends ECOption>(optionsFactory: () => T, hooks: ChartHooks = {}) {
  const scope = effectScope()

  const themeStore = useThemeStore()
  const darkMode = computed(() => themeStore.darkMode)

  const domRef = ref<HTMLElement | null>(null)
  const initialSize = { width: 0, height: 0 }
  const { width, height } = useElementSize(domRef, initialSize)

  let chart: echarts.ECharts | null = null
  const chartOptions: T = optionsFactory()

  const {
    onRender = (instance) => {
      const textColor = darkMode.value ? 'rgb(224, 224, 224)' : 'rgb(31, 31, 31)'
      const maskColor = darkMode.value ? 'rgba(0, 0, 0, 0.4)' : 'rgba(255, 255, 255, 0.8)'

      instance.showLoading({
        color: themeStore.themeColor,
        textColor,
        fontSize: 14,
        maskColor,
      })
    },
    onUpdated = (instance) => {
      instance.hideLoading()
    },
    onDestroy,
  } = hooks

  /**
   * @description 是否可以开始渲染echart
   */
  function canRender() {
    return domRef.value && initialSize.width > 0 && initialSize.height > 0
  }

  /**
   * @description echart是否已经渲染完毕
   */
  function isRendered() {
    return Boolean(domRef.value && chart)
  }

  /**
   * @description 更新echart选项
   * @param callback 回调函数，echarts设置的options选项
   */
  async function updateOptions(callback: (opts: T, optsFactory: () => T) => ECOption = () => chartOptions) {
    if (!isRendered())
      return

    const updatedOpts = callback(chartOptions, optionsFactory)

    Object.assign(chartOptions, updatedOpts)

    if (isRendered()) {
      chart?.clear()
    }

    chart?.setOption({ ...updatedOpts, backgroundColor: 'transparent' })

    await onUpdated?.(chart!)
  }

  /**
   * @description 设置echart选项
   */
  function setOptions(options: T) {
    chart?.setOption(options)
  }

  /**
   * @description 渲染图表
   */
  async function render() {
    if (!isRendered()) {
      const chartTheme = darkMode.value ? 'dark' : 'light'

      await nextTick()

      chart = echarts.init(domRef.value, chartTheme)

      chart.setOption({ ...chartOptions, backgroundColor: 'transparent' })

      await onRender?.(chart)
    }
  }

  /**
   * @description 图表缩放
   */
  function resize() {
    chart?.resize()
  }

  /**
   * @description 图表销毁
   */
  async function destroy() {
    if (!chart)
      return

    await onDestroy?.(chart)
    chart?.dispose()
    chart = null
  }

  /**
   * @description 黑暗/明亮模式变更重新渲染图表
   */
  async function changeTheme() {
    await destroy()
    await render()
    await onUpdated?.(chart!)
  }

  /**
   * @description 缩放后重新渲染图表
   * @param w 宽度
   * @param h 高度
   */
  async function renderChartBySize(w: number, h: number) {
    initialSize.width = w
    initialSize.height = h

    if (!canRender()) {
      await destroy()

      return
    }

    if (isRendered()) {
      resize()
    }

    await render()
  }

  scope.run(() => {
    watch([width, height], ([newWidth, newHeight]) => {
      renderChartBySize(newWidth, newHeight)
    })

    watch(darkMode, () => {
      changeTheme()
    })
  })

  onScopeDispose(() => {
    destroy()
    scope.stop()
  })

  return {
    domRef,
    updateOptions,
    setOptions,
  }
}
