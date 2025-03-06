import type { ProxyOptions } from 'vite'

type ProxyItem = [string, string]
type ProxyList = ProxyItem[]

/**
 * 设置网络代理
 * @param isOpenProxy - 是否开启代理
 * @param proxyConfig - 代理配置
 */
export function createViteProxy(isOpenProxy: boolean | undefined, proxyConfig: ProxyList = []) {
  const proxyConfigs: Record<string, string | ProxyOptions> = {}
  if (!isOpenProxy)
    return proxyConfigs
  proxyConfig.forEach((configs: Array<string>) => {
    const [prefix, target] = configs
    proxyConfigs[prefix] = {
      target,
      changeOrigin: true,
      rewrite: (path: string): string => path.replace(new RegExp(`^${prefix}`), ''),
      ws: true,
      secure: false, // https需要改成false
    }
  })
  return proxyConfigs
}
