/**
 * @name SvgIconsPlugin
 * @description 加载SVG文件，自动引入
 */
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { getDirPath } from '../utils'

export const ConfigSvgIconsPlugin = (prefix: string = 'local', isBuild: boolean) => {
	return createSvgIconsPlugin({
		// 指定需要缓存的图标文件夹
		iconDirs: [getDirPath('src/assets/svg-icons')],
		// 指定symbolId格式
		symbolId: `${prefix}-[dir]-[name]`,
		// 自定义插入位置 默认 body-last
		inject: 'body-last',
		// 自定义dom id
		customDomId: '__SVG_ICON_LOCAL__',
		// svg 压缩配置
		svgoOptions: isBuild
	})
}
