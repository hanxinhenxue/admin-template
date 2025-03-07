import type { RequestConfig } from './type'
import { isArray, isFile } from '@/utils'
import qs from 'qs'

// 请求参数自动格式化拦截器
export async function autoFormatParamsInterceptor(config: RequestConfig) {
  if (config.autoFormat === false)
    return config // 允许手动关闭

  const contentType = config.headers?.['Content-Type']
    || config.headers?.['content-type']

  // 自动识别未指定Content-Type的情况
  if (!contentType) {
    if (config.data instanceof FormData) {
      config.headers!['Content-Type'] = 'multipart/form-data'
    }
    else if (typeof config.data === 'object') {
      config.headers!['Content-Type'] = 'application/json'
    }
  }

  // 根据Content-Type处理参数格式
  switch (true) {
    case contentType?.includes('x-www-form-urlencoded'):
      config.data = qs.stringify(config.data)
      break

    case contentType?.includes('multipart/form-data'):
      config.data = await handleFormData(config.data)
      break

    case contentType?.includes('application/json'):
    default:
      if (typeof config.data === 'object') {
        config.data = JSON.stringify(config.data)
      }
  }

  return config
}
async function handleFormData(data: Record<string, any>) {
  const formData = new FormData()
  const entries = Object.entries(data)

  entries.forEach(async ([key, value]) => {
    const isFileType = isFile(value) || (isArray(value) && value.length && isFile(value[0]))

    if (isFileType) {
      await transformFile(formData, key, value)
    }
    else {
      formData.append(key, value)
    }
  })

  return formData
}
/**
 * 接口为上传文件的类型时数据转换
 * @param formData - formData
 * @param key - 文件的属性名
 * @param file - 单文件或多文件
 */
async function transformFile(formData: FormData, key: string, file: File[] | File) {
  if (isArray(file)) {
    // 多文件
    await Promise.all(
      (file as File[]).map((item) => {
        formData.append(key, item)
        return true
      }),
    )
  }
  else {
    // 单文件
    formData.append(key, file)
  }
}
