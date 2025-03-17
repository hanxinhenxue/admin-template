import 'axios'

declare module 'axios' {
  interface AxiosResponse {
    /* 状态码 */
    code?: number
    /* message */
    message?: string
    /* 任意数据 */
    [key: string]: any
  }
}
