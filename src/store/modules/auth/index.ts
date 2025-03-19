import { fetchToken, fetchUserInfo, toLogout } from '@/api'
import { useLoading } from '@/hooks'
import { addDynamicRoutes, resetRouter, router } from '@/router'
import { getTimePoint, localStg } from '@/utils'
import { defineStore } from 'pinia'
import { clearAuthStorage, getToken } from './shared'

export const useAuthStore = defineStore('auth-store', () => {
  const token = ref(getToken())
  const { loading: loginLoading, startLoading, endLoading } = useLoading()

  const userInfo = reactive({
    userId: '',
    userName: '',
    avatar: '',
    roles: [],
    permissions: [],
  })

  /** Is login */
  const isLogin = computed(() => Boolean(token.value))

  const userPermissions = computed<string[]>(() => userInfo?.roles || [])

  const avatar = computed(() => userInfo?.avatar || '')

  const userAuthority = computed(() => userInfo?.permissions || [])

  /**
   * @description 退出登录，清空缓存及信息
   */
  async function logout() {
    toLogout().then(() => {
      const authStore = useAuthStore()

      clearAuthStorage()

      authStore.$reset()

      const currentRoute = unref(router.currentRoute)
      const redirect = currentRoute.fullPath
      router.replace({
        name: import.meta.env.VITE_ROUTE_LOGIN_NAME,
        query: {
          redirect,
        },
      })
      resetRouter()
    })
  }
  /**
   * 处理登录后成功或失败的逻辑
   * @param loginToken - 返回的token
   */
  async function handleActionAfterLogin(loginToken: string) {
    token.value = loginToken
    localStg.set('token', loginToken)
    const { data: userInfo } = await fetchUserInfo()
    Object.assign(userInfo, userInfo)
    localStg.set('userInfo', userInfo)
    await addDynamicRoutes()
    const query = unref(router.currentRoute).query
    // 跳转登录后的地址
    // 获取登录后去往的路由，默认首页，有redirect就跳转redirect
    if (query?.redirect) {
      const path = query.redirect as string
      Reflect.deleteProperty(query, 'redirect')
      router.push({ path, query })
    }
    else {
      router.push(import.meta.env.VITE_ROUTE_HOME_PATH)
    }

    // 登录成功弹出欢迎提示
    window.$notification?.success({
      title: `${getTimePoint()}`,
      content: `欢迎回来，${userInfo.username}`,
      duration: 3000,
    })
  }
  /**
   * 登录
   * @param username - 用户名
   * @param password - 密码加密
   * @param saveAccount - 存储账号
   */
  async function loginHandle(username: string, password: string, saveAccount: boolean) {
    startLoading()
    fetchToken({ username, password }).then(({ code, data }) => {
      if (code === 200 && data) {
        if (saveAccount) {
          localStg.set('loginInfo', { username })
        }
        handleActionAfterLogin(data.token)
        endLoading()
      }
    }).finally(() => {
      endLoading()
    })
  }

  return {
    token,
    userInfo,
    userPermissions,
    isLogin,
    loginLoading,
    avatar,
    userAuthority,
    logout,
    loginHandle,
  }
})
