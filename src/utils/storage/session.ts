import { crypto } from '../crypto'

/**
 * @desc sessionStg存储，加密
 */
class CreateSessionStorage {
  /**
   * 存储 SessionStorage
   * @param key - 键名 value - 值，会被加密
   */
  set(key: string, value: unknown) {
    const json = crypto.encrypt(value)
    window.sessionStorage.setItem(key, json)
  }

  /**
   * 获取 SessionStorage
   * @param key - 键名
   * @result value | null
   */
  get(key: string) {
    const json = window.sessionStorage.getItem(key)
    let data = null
    if (json) {
      try {
        data = crypto.decrypt(json)
      }
      catch (error) {
      // 防止解析失败
        console.error(`读取sessionStorage存储项 ${key} 失败:`, error)
        this.remove(key)
      }
    }
    return data
  }

  /**
   * 移除 SessionStorage 值
   * @param key - 键名
   */
  remove(key: string) {
    window.sessionStorage.removeItem(key)
  }

  /**
   * 清空SessionStorage
   */
  clear() {
    window.sessionStorage.clear()
  }
}

export const sessionStg = new CreateSessionStorage()
