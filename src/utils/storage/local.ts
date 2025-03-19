import { crypto } from '../crypto'
/**
 * @desc 本地存储，local加密，默认存储7天
 */
interface StorageData<T = unknown> {
  data: T
  expire?: number | null
}
class CreateLocalStorage {
  // 默认存储7天
  private readonly DEFAULT_CACHE_TIME = 60 * 60 * 24 * 7

  /**
   * 设置 localStorage
   * @param key - 键名 value 存储的数据 expire 过期时间，单位为小时，默认7 * 24小时(7天)
   */
  set<T>(key: string, value: T, expire: number | null = this.DEFAULT_CACHE_TIME) {
    const storageData: StorageData<T> = {
      data: value,
      expire: expire !== null ? new Date().getTime() + expire * 1000 : null,
    }
    const json = crypto.encrypt(storageData)
    window.localStorage.setItem(key, json)
  }

  /**
   * 获取 localStorage 值
   * @param key - 键名
   * @result value | null
   */
  get<T>(key: string): T | null {
    const json = window.localStorage.getItem(key)
    if (!json)
      return null
    const parsed = crypto.decrypt(json)
    if (!parsed)
      return null
    try {
      if (!parsed || typeof parsed !== 'object') {
        throw new Error('Invalid storage format')
      }
      const storageData = parsed as StorageData<T>
      if (!('data' in storageData)) {
        throw new Error('Missing data field')
      }
      const { data, expire } = storageData
      if (expire && Date.now() > expire) {
        this.remove(key)
        return null
      }
      return data
    }
    catch (error) {
      // 防止解析失败
      console.error(`读取localStorage存储项 ${key} 失败:`, error)
      this.remove(key)
      return null
    }
  }

  /**
   * 移除 localStorage 值
   * @param key - 键名
   */
  remove(key: string) {
    window.localStorage.removeItem(key)
  }

  /**
   * 清空 localStorage
   */
  clear() {
    window.localStorage.clear()
  }
}

export const localStg = new CreateLocalStorage()
