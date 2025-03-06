import CryptoJS from 'crypto-js'

class Crypto<T> {
  /** Secret */
  secret: string

  constructor(secret: string) {
    this.secret = secret
  }

  /**
   * 加密数据
   * @param data - 数据
   */
  encrypt(data: T): string {
    const dataString = JSON.stringify(data)
    const encrypted = CryptoJS.AES.encrypt(dataString, this.secret)
    return encrypted.toString()
  }

  /**
   * 解密数据
   * @param encrypted - 密文
   */
  decrypt(encrypted: string) {
    const decrypted = CryptoJS.AES.decrypt(encrypted, this.secret)
    const dataString = decrypted.toString(CryptoJS.enc.Utf8)
    try {
      return JSON.parse(dataString) as T
    }
    catch {
      // avoid parse error
      return null
    }
  }

  /**
   * md5加密，不可解密
   * @param data - 数据
   */
  encryptMd5(data: string) {
    return CryptoJS.MD5(data).toString(CryptoJS.enc.Hex)
  }
}

export const crypto = new Crypto('__CryptoJS_Secret__')
