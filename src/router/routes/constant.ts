/**
 * @description 基础路由，无权限也能访问的，如登录
 */
export const ROOT_ROUTE
= {
  name: 'root',
  path: '/',
  redirect: import.meta.env.VITE_ROUTE_HOME_PATH,
  meta: {
    title: 'root',
    constant: true,
  },
}

export const NOT_FOUND_ROUTE = {
  name: 'not-found',
  path: '/:pathMatch(.*)*',
  meta: {
    title: 'not-found',
    constant: true,
  },
}

export const builtinRoutes = [ROOT_ROUTE, NOT_FOUND_ROUTE]
