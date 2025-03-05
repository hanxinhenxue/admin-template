import type { ProxyOptions } from 'vite'

/**
 * 设置网络代理
 * @param isOpenProxy - 是否开启代理
 * @param proxyConfig - 代理配置
 */
export function createViteProxy(isUseProxy: boolean | undefined, proxyConfig: ProxyList = []) {
	const proxyConfigs: Record<string, string | ProxyOptions> = {}
	if (!isUseProxy) return proxyConfigs
	proxyConfig.forEach((configs: Array<string>) => {
		const [prefix, target] = configs
		proxyConfigs[prefix] = {
			target,
			changeOrigin: true,
			rewrite: (path: string): string => path.replace(new RegExp(`^${prefix}`), ''),
			ws: true,
			secure: false // https需要改成false
		}
	})
	return proxyConfigs
}
