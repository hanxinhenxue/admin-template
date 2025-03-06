import antfu from '@antfu/eslint-config'

export default antfu(
  {
    unocss: true,
    vue: true,
  },
  {
  // 关闭组件标签顺序强制规则
    rules: {
      'vue/block-order': [
        'error',
        {
          order: ['template', 'script', 'style'], // 自定义顺序
        },
      ],
      '@typescript-eslint/no-empty-object-type': 'off',
    },
  },
)
