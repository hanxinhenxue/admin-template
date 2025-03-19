/**
 * @description gzip压缩，开发环境默认false
 */
import ViteCompression from 'vite-plugin-compression'

export function ConfigCompressPlugin(viteEnv: Env.ImportMeta) {
  const { VITE_COMPRESS_TYPE = 'gzip' } = viteEnv
  return ViteCompression({ algorithm: VITE_COMPRESS_TYPE })
}
