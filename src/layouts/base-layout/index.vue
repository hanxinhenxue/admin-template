<template>
  <n-layout has-sider wh-full>
    <template v-if="themeStore.layout.mode === 'vertical'">
      <n-layout-sider
        v-if="!appStore.fullContent"
        bordered
        collapse-mode="width"
        :collapsed-width="themeStore.sider.collapsedWidth"
        :width="themeStore.sider.width"
        :native-scrollbar="false"
        :collapsed="appStore.siderCollapse"
        :inverted="!themeStore.darkMode && themeStore.sider.inverted"
      >
        <GlobalSider />
      </n-layout-sider>
      <main class="relative flex flex-col flex-1 overflow-hidden">
        <GlobalHeader />
        <GlobalTab />
        <section class="layout-main__container flex-col flex-1 overflow-y-auto">
          <GlobalContent />
          <GlobalFooter v-if="!themeStore.footer.fixed" />
        </section>
        <GlobalFooter v-if="themeStore.footer.fixed" />
      </main>
    </template>
    <template v-else-if="themeStore.layout.mode === 'horizontal'">
      <main class="relative flex flex-col flex-1 overflow-hidden">
        <HorizontalHeader />
        <GlobalTab />
        <section class="layout-main__container flex-col flex-1 overflow-y-auto">
          <GlobalContent />
          <GlobalFooter v-if="!themeStore.footer.fixed" />
        </section>
        <GlobalFooter v-if="themeStore.footer.fixed" />
      </main>
    </template>
    <template v-else-if="themeStore.layout.mode === 'vertical-mix'">
      <MixAside />
      <main class="main-transition relative flex flex-col flex-1 overflow-hidden">
        <VerticalMixHeader />
        <GlobalTab />
        <section class="layout-main__container flex-col flex-1 overflow-y-auto">
          <GlobalContent />
          <GlobalFooter v-if="!themeStore.footer.fixed" />
        </section>
        <GlobalFooter v-if="themeStore.footer.fixed" />
      </main>
    </template>
  </n-layout>
</template>

<script setup lang="ts">
import { useAppStore, useThemeStore } from '@/store'
import GlobalContent from '../modules/global-content/index.vue'
import GlobalFooter from '../modules/global-footer/index.vue'
import GlobalHeader from '../modules/global-header/index.vue'
import GlobalSider from '../modules/global-sider/index.vue'
import GlobalTab from '../modules/global-tab/index.vue'
import HorizontalHeader from '../modules/horizontal-header/index.vue'
import MixAside from '../modules/mix-aside/index.vue'
import VerticalMixHeader from '../modules/vertical-mix-header/index.vue'

defineOptions({
  name: 'BaseLayout',
})

const themeStore = useThemeStore()
const appStore = useAppStore()
</script>

<style lang="scss" scoped>
	.layout-main__container {
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
	.dark .layout-main__container {
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
  .main-transition {
    transition: flex 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
</style>
