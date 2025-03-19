<template>
  <div
    class="tab-item__container" :class="{
      'tab-item__container--dark': props.darkMode,
      'tab-item__container--light': !props.darkMode,
      'tab-item__container--button': props.mode === 'button',
      'tab-item__container--chrome': props.mode === 'chrome',
      'active': props.active,
    }" @click="toggleHandle"
  >
    <slot />
    <SvgIcon v-if="props.closable" icon="ion:close" @click.stop="closeHandle" />
    <div v-if="props.mode === 'chrome' && !props.active" class="chrome-divide" />
  </div>
</template>

<script setup lang="ts">
import { getColorPalettes } from '@/utils'

defineOptions({ name: 'TabItem' })

const props = defineProps({
  // 选项卡模式
  mode: {
    type: String,
    default: 'button',
  },
  // 选项卡是否是暗黑模式
  darkMode: {
    type: Boolean,
    default: false,
  },
  // 选项卡是否激活
  active: {
    type: Boolean,
    default: false,
  },
  // 选项卡激活时的背景色
  activeColor: {
    type: String,
    default: '',
  },
  // 选项卡是否可关闭
  closable: {
    type: Boolean,
    default: true,
  },
  // 选项卡路由
  tabPath: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['close', 'toggle'])
function closeHandle() {
  emit('close', props.tabPath)
}
function toggleHandle() {
  emit('toggle', props.tabPath)
}

const bgColor = computed(() => getColorPalettes(props.activeColor, props.darkMode)[2])
</script>

<style lang="scss" scoped>
.tab-item__container {
	--c: v-bind(props.activeColor);
	--bg: v-bind(bgColor);
	@apply relative cursor-pointer text-14px flex-center gap-12px;
	white-space: nowrap;

	&--button {
		@apply b-[#e5e7eb] dark:b-[#ffffff3d] b-1px rounded-4px b-solid px-12px py-4px;

		&:hover {
			color: var(--c);
			border-color: var(--c);
		}

		&.active {
			color: var(--c);
			border-color: var(--c);
			background-color: var(--bg);
		}
	}

	&--chrome {
		@apply relative px-24px py-4px;
		border-radius: 12px 12px 0 0;

		.chrome-divide {
			@apply absolute w-1px h-16px right-7px;
		}

		&.active {
			color: var(--c);
			background-color: var(--bg);
			z-index: 10;

			&::after,
			&::before {
				box-shadow: 0 0 0 30px var(--bg);
			}
		}

		&.tab-item__container--light {
			.chrome-divide {
				background: #1f2225;
			}

			&:not(.active):hover {
				background-color: #dee1e6;

				.chrome-divide {
					display: none;
				}

				&::after,
				&::before {
					box-shadow: 0 0 0 30px #dee1e6;
				}
			}
		}

		&.tab-item__container--dark {
			.chrome-divide {
				background: #ffffffe6;
			}

			&:not(.active):hover {
				background-color: #333;

				&::after,
				&::before {
					box-shadow: 0 0 0 30px #333;
				}
			}
		}

		&::before,
		&::after {
			@apply absolute bottom-0 w-20px h-20px rounded-full;
			content: '';
			box-shadow: 0 0 0 40px transparent;
		}

		&::before {
			left: -20px;
			clip-path: inset(50% -10px 0 50%);
		}

		&::after {
			right: -20px;
			clip-path: inset(50% 50% 0 -10px);
		}
	}
}
</style>
