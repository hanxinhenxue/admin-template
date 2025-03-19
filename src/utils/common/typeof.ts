/**
 * @description 判断数据类型
 * @param value - 数据源
 * @return boolean - 数据类型是否一致
 */
export const dataTypeLabels = {
  string: '[object String]',
  number: '[object Number]',
  boolean: '[object Boolean]',
  null: '[object Null]',
  undefined: '[object Undefined]',
  symbol: '[object Symbol]',
  bigInt: '[object BigInt]',
  object: '[object Object]',
  function: '[object Function]',
  array: '[object Array]',
  date: '[object Date]',
  regExp: '[object RegExp]',
  promise: '[object Promise]',
  set: '[object Set]',
  map: '[object Map]',
  file: '[object File]',
}
/**
 * @desc 判断类型公用函数
 */
function getDataTypeString<K extends UtilTypes.DataTypeStringKey>(value: unknown) {
  return Object.prototype.toString.call(value) as UtilTypes.DataTypeString<K>
}

export function isNumber<T extends number>(value: T | unknown): value is T {
  return getDataTypeString(value) === dataTypeLabels.number
}

export function isString<T extends string>(value: T | unknown): value is T {
  return getDataTypeString(value) === dataTypeLabels.string
}

export function isBoolean<T extends boolean>(value: T | unknown): value is T {
  return getDataTypeString(value) === dataTypeLabels.boolean
}

export function isNull<T extends null>(value: T | unknown): value is T {
  return getDataTypeString(value) === dataTypeLabels.null
}

export function isUndefined<T extends undefined>(value: T | unknown): value is T {
  return getDataTypeString(value) === dataTypeLabels.undefined
}

export function isNullOrUndef(val: unknown) {
  return isNull(val) || isUndefined(val)
}

/** 空数组 | 空字符串 | 空对象 | 空Map | 空Set */
export function isEmpty(value: unknown) {
  if (value === true || value === false)
    return true
  if (value === null || value === undefined)
    return true
  if (isNumber(value))
    return value === 0
  if (isDate(value))
    return Number.isNaN(value.getTime())
  if (isFunction(value))
    return false
  if (isSymbol(value))
    return false
  const length = (value as any).length
  if (isNumber(length))
    return length === 0
  const size = (value as any).size
  if (isNumber(size))
    return size === 0
  const keys = Object.keys(value).length
  return keys === 0
}

export function isSymbol<T extends symbol>(value: T | unknown): value is T {
  return getDataTypeString(value) === dataTypeLabels.symbol
}

export function isBigInt<T extends bigint>(value: T | unknown): value is T {
  return getDataTypeString(value) === dataTypeLabels.bigInt
}

export function isObject<T extends Record<string, any>>(value: T | unknown): value is T {
  return getDataTypeString(value) === dataTypeLabels.object
}

export function isArray<T extends any[]>(value: T | unknown): value is T {
  return getDataTypeString(value) === dataTypeLabels.array
}

export function isFunction<T extends () => any | void>(value: T | unknown): value is T {
  return getDataTypeString(value) === dataTypeLabels.function
}

export function isDate<T extends Date>(value: T | unknown): value is T {
  return getDataTypeString(value) === dataTypeLabels.date
}

export function isRegExp<T extends RegExp>(value: T | unknown): value is T {
  return getDataTypeString(value) === dataTypeLabels.regExp
}

export function isPromise<T extends Promise<any>>(value: T | unknown): value is T {
  return getDataTypeString(value) === dataTypeLabels.promise
}

export function isSet<T extends Set<any>>(value: T | unknown): value is T {
  return getDataTypeString(value) === dataTypeLabels.set
}

export function isMap<T extends Map<any, any>>(value: T | unknown): value is T {
  return getDataTypeString(value) === dataTypeLabels.map
}

export function isFile<T extends File>(value: T | unknown): value is T {
  return getDataTypeString(value) === dataTypeLabels.file
}

export function isInt(value: unknown): value is number {
  return isNumber(value) && value % 1 === 0
}

export function isFloat(value: unknown): value is number {
  return isNumber(value) && value % 1 !== 0
}
