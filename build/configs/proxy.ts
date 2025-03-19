import type { ProxyOptions } from 'vite'

type ProxyItem = [string, string]
type ProxyList = ProxyItem[]

/**
 * @description 设置网络代理
 * @params isOpenProxy - 是否开启代理，开发环境默认为true
 * @params proxyConfig - 代理配置，在env文件中修改VITE_PROXY，可以配置多套代理
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
      secure: false, // https需要改成false，忽略https证书校验
    }
  })
  return proxyConfigs
}
