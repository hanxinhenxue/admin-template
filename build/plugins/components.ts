/**
 * @name  AutoRegistryComponents
 * @description 按需加载，自动引入组件
 */

import Components from "unplugin-vue-components/vite"
import IconsResolver from "unplugin-icons/resolver" // 自动引入图标
import { NaiveUiResolver } from "unplugin-vue-components/resolvers"

export const AutoRegistryComponents = () => {
	return Components({
		dirs: ["src/components"],
		types: [{ from: 'vue-router', names: ['RouterLink', 'RouterView'] }],
		extensions: ["vue", "md"],
		deep: true,
		dts: "src/typings/components.d.ts",
		directoryAsNamespace: false,
		globalNamespaces: [],
		directives: true,
		include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
		exclude: [/[\\/]node_modules[\\/]/, /[\\/]\.git[\\/]/, /[\\/]\.nuxt[\\/]/],
		resolvers: [NaiveUiResolver(), IconsResolver()],
	})
}
