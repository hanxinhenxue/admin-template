import type { PluginOption, Plugin } from "vite"
import vue from "@vitejs/plugin-vue"
import unocss from "unocss/vite"
import { AutoRegistryComponents } from "./components"
import { AutoImportDeps } from "./autoImport"
import { ConfigSvgIconsPlugin } from "./svgIcons"
import { ConfigCompressPlugin } from "./compress"
import vueDevTools from 'vite-plugin-vue-devtools'

/**
 * vite插件
 * @param viteEnv - 环境变量配置
 * @param isBuild - 是否是生产阶段
 */
export function setupVitePlugins(viteEnv: ViteEnv, isBuild: boolean): (PluginOption | PluginOption[])[]  {
	const { VITE_COMPRESS, VITE_ICON_PREFIX } = viteEnv
	const vitePlugins: (Plugin | Plugin[] | PluginOption[] | PluginOption)[] = [
		// vue支持
		vue(), 
		// unocss支持
		unocss(), 
		// vue3.x devtools
		vueDevTools()
	]

	// 自动按需引入组件
	vitePlugins.push(AutoRegistryComponents())

	// 自动按需引入依赖
	vitePlugins.push(AutoImportDeps())

	// vite-plugin-svg-icons
	vitePlugins.push(ConfigSvgIconsPlugin(VITE_ICON_PREFIX, isBuild))

	if (isBuild && VITE_COMPRESS) {
		// 开启.gz压缩  rollup-plugin-gzip
		vitePlugins.push(ConfigCompressPlugin(viteEnv))
	}

	return vitePlugins
}
