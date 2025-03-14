import { SetupStoreId } from '@/enum'
import { useRouterPush } from '@/hooks/common/router'
import { $t } from '@/locales'
import { fetchGetUserInfo, fetchLogin } from '@/service/api'
import { localStg } from '@/utils/storage'
import { useLoading } from '@sa/hooks'
import { defineStore } from 'pinia'
import { computed, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useRouteStore } from '../route'
import { useTabStore } from '../tab'
import { clearAuthStorage, getToken } from './shared'

export const useAuthStore = defineStore('auth-store', () => {
  const route = useRoute()
  const routeStore = useRouteStore()
  const tabStore = useTabStore()
  const { toLogin, redirectFromLogin } = useRouterPush(false)
  const { loading: loginLoading, startLoading, endLoading } = useLoading()

  const token = ref(getToken())

  const userInfo = reactive({
    userId: '',
    userName: '',
    roles: [],
    permissions: [],
  })

  /** is super role in static route */
  const isStaticSuper = computed(() => {
    const { VITE_AUTH_ROUTE_MODE, VITE_STATIC_SUPER_ROLE } = import.meta.env

    return VITE_AUTH_ROUTE_MODE === 'static' && userInfo.roles.includes(VITE_STATIC_SUPER_ROLE)
  })

  /** Is login */
  const isLogin = computed(() => Boolean(token.value))

  /** Reset auth store */
  async function resetStore() {
    const authStore = useAuthStore()

    clearAuthStorage()

    authStore.$reset()

    if (!route.meta.constant) {
      await toLogin()
    }

    tabStore.cacheTabs()
    routeStore.resetStore()
  }

  /**
   * Login
   *
   * @param userName User name
   * @param password Password
   * @param [redirect] Whether to redirect after login. Default is `true`
   */
  async function login(userName: string, password: string, redirect = true) {
    startLoading()

    const { data: loginToken, error } = await fetchLogin(userName, password)

    if (!error) {
      const pass = await loginByToken(loginToken)

      if (pass) {
        await redirectFromLogin(redirect)

        window.$notification?.success({
          title: $t('page.login.common.loginSuccess'),
          content: $t('page.login.common.welcomeBack', { userName: userInfo.userName }),
          duration: 4500,
        })
      }
    }
    else {
      resetStore()
    }

    endLoading()
  }

  async function loginByToken(loginToken: Api.Auth.LoginToken) {
    // 1. stored in the localStorage, the later requests need it in headers
    localStg.set('token', loginToken.token)
    localStg.set('refreshToken', loginToken.refreshToken)

    // 2. get user info
    const pass = await getUserInfo()

    if (pass) {
      token.value = loginToken.token

      return true
    }

    return false
  }

  async function getUserInfo() {
    const { data: info, error } = await fetchGetUserInfo()

    if (!error) {
      // update store
      Object.assign(userInfo, info)

      return true
    }

    return false
  }

  async function initUserInfo() {
    const hasToken = getToken()

    if (hasToken) {
      const pass = await getUserInfo()

      if (!pass) {
        resetStore()
      }
    }
  }

  return {
    token,
    userInfo,
    isStaticSuper,
    isLogin,
    loginLoading,
    resetStore,
    login,
    initUserInfo,
  }
})
