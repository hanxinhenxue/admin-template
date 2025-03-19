import useBoolean from './use-boolean'
/**
 * @description loading组合式函数
 * @param initValue 初始值
 */
export default function useLoading(initValue = false) {
  const { bool: loading, setTrue: startLoading, setFalse: endLoading } = useBoolean(initValue)

  return {
    loading,
    startLoading,
    endLoading,
  }
}
