import type { PiniaPluginContext } from 'pinia'
import { klona as jsonClone } from 'klona/json'

/**
 * 自定义实现重置 store
 * @param context
 */
export function resetSetupStore(context: PiniaPluginContext) {
  const SetupStoreId = {
    app: 'app-store',
    auth: 'auth-store',
    route: 'route-store',
    tab: 'tab-store',
    theme: 'theme-store',
  }
  const setupSyntaxIds = Object.values(SetupStoreId)

  if (setupSyntaxIds.includes(context.store.$id)) {
    const { $state } = context.store

    const defaultStore = jsonClone($state)

    context.store.$reset = () => {
      context.store.$patch(defaultStore)
    }
  }
}
