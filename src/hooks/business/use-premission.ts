/**
 * 判断是否拥有权限，需要和权限结合
 * @param initValue 初始值
 */
import { useAuthStore } from '@/store'

import { isArray, isString } from '@/utils'
/** 权限判断 */
export function usePermission() {
  const useAuth = useAuthStore()

  function hasPermission(permission: string | string[]) {
    // 如果角色拥有管理员角色，则按钮级别的权限全部显示
    //   let isMaximumPermissions = useAuth.userPermissions?.includes('admin')
    let isMaximumPermissions = false
    if (!isMaximumPermissions) {
      if (isArray(permission)) {
        isMaximumPermissions = useAuth.userAuthority.filter((btnPermission: string) => permission.includes(btnPermission)).length > 0
      }
      if (isString(permission)) {
        isMaximumPermissions = useAuth.userAuthority.includes(permission)
      }
    }
    return isMaximumPermissions
  }

  return {
    hasPermission,
  }
}
