/// <reference types="vite/client" />
/** 声明环境变量的类型 */
interface ViteEnv {
	/** 网站标题title */
	readonly VITE_TITLE: string
	/** 网站加载标题title */
	readonly VITE_Name: string
	/** 网站描述description */
	readonly VITE_DESCRIPTION: string
	/** 网站关键字keywords */
	readonly VITE_KEYWORDS: string
	/** 开发配置 */
	/** 公共路径 */
	readonly VITE_BASE_URL: string
	/** 开发模式自动打开浏览器 */
	readonly VITE_OPEN?: boolean
	/** 开发模式端口号 */
	readonly VITE_PORT?: number
	/** 路由首页的路径 */
	readonly VITE_ROUTE_HOME_PATH: string
	/** 是否使用hash路由 */
	readonly VITE_USE_HASH?: boolean
	/** eslint错误显示在浏览器中，团队合作需要使用 */
	readonly VITE_ESLINT_IN_BROWSER?: boolean
	/** iconify图标作为组件的前缀 */
	readonly VITE_ICON_PREFIX: string
	/** 是否开启打包压缩 */
	readonly VITE_COMPRESS?: boolean
	/** 压缩模式 */
	readonly VITE_COMPRESS_TYPE?: 'gzip' | 'brotliCompress' | 'deflate' | 'deflateRaw'
	/** 开发代理模式 */
	readonly VITE_PROXY?: [string, string][]
}

/** 键值对对象 */
type Recordable<T = unknown> = {
	[x: string]: T
}

/** 代理配置类型 */
type ProxyItem = [string, string]

/** 开发env文件中代理配置 例如： [ ['/api', 'https://www.baidu.com'], ... ] */
type ProxyList = ProxyItem[]
