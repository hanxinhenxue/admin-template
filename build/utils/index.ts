import path from 'node:path'
import process from 'node:process'

/**
 * @description 获取项目根路径，末尾不带斜杠
 */
export function getRootPath() {
  return path.resolve(process.cwd())
}

/**
 * @description 获取项目目录路径，末尾不带斜杠
 * @param dirName - 拼接的目录名称(默认: "src")
 */
export function getDirPath(dirName = 'src') {
  const rootPath = getRootPath()

  return `${rootPath}/${dirName}`
}

/**
 * @description 将环境变量参数改为需要的类型
 * @param envConf - env文件参数
 * @descrition 将env文件参数转换为确定的类型
 */
export function wrapperEnv(envConf: Record<string, any>): Env.ImportMeta {
  const ret: any = {}

  for (const envName of Object.keys(envConf)) {
    let realName = envConf[envName].replace(/\\n/g, '\n')
    realName = realName === 'true' ? true : realName === 'false' ? false : realName

    if (envName === 'VITE_PORT') {
      realName = Number(realName)
    }
    if (envName === 'VITE_PROXY' && realName) {
      try {
        realName = JSON.parse(realName.replace(/'/g, '"'))
      }
      catch (error) {
        console.error(`VITE_ERROR: ${error}`)
        realName = ''
      }
    }
    ret[envName] = realName
    if (typeof realName === 'string') {
      process.env[envName] = realName
    }
    else if (typeof realName === 'object') {
      process.env[envName] = JSON.stringify(realName)
    }
  }
  return ret
}
