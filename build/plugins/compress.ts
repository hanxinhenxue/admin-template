/**
 * @name ConfigCompressPlugin
 * @description 开启.gz压缩
 */
import ViteCompression from 'vite-plugin-compression'

export function ConfigCompressPlugin(viteEnv: ViteEnv) {
  const { VITE_COMPRESS_TYPE = 'gzip' } = viteEnv
  return ViteCompression({ algorithm: VITE_COMPRESS_TYPE })
}
