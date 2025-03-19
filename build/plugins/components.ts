/**
 * @description UI组件库自动引入
 */
import IconsResolver from 'unplugin-icons/resolver' // 自动引入图标
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'

export function AutoRegistryComponents() {
  return Components({
    dirs: ['src/components'],
    types: [{ from: 'vue-router', names: ['RouterLink', 'RouterView'] }],
    extensions: ['vue', 'md'],
    deep: true,
    dts: 'src/typings/components.d.ts',
    directoryAsNamespace: false,
    globalNamespaces: [],
    directives: true,
    include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
    exclude: [/[\\/]node_modules[\\/]/, /[\\/]\.git[\\/]/, /[\\/]\.nuxt[\\/]/],
    resolvers: [NaiveUiResolver(), IconsResolver()],
  })
}
