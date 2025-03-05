import globals from 'globals'
// 导入了 `globals`全局变量的库模块，该模块提供了一组预定义的全局变量（如 window、document 等），这些变量通常在不同的环境（如浏览器、Node.js）中可用。在 ESLint 配置中，你可以使用这个模块来指定代码所运行的环境，从而定义全局变量。

import pluginJs from '@eslint/js'
//针对 JavaScript 的 ESLint 配置和规则。保持 JavaScript 代码的一致性和质量

import tseslint from 'typescript-eslint'
// 导入 `typescript-eslint` 插件（ `typescript-eslint/parser` 和 `typescript-eslint/eslint-plugin`）。提供了对 TypeScript 的支持，包括 TS 的解析器和推荐的规则集，用于在 TypeScript 文件中进行 lint 检查。

import pluginVue from 'eslint-plugin-vue'
// 导入 `eslint-plugin-vue` 插件，提供了 Vue.js 特有 ESLint 规则。确保 Vue 文件（`.vue` 文件）中的代码符合 Vue.js 的最佳实践和代码风格指南

import unocssConfig from '@unocss/eslint-config/flat'
// Unocss 规则 

import eslintAutoImport from './.eslintrc-auto-import.json' with { type: 'json' }
// 自动导入的全局定义规则

export default [
	unocssConfig,

	{ files: ['**/*.{js,mjs,cjs,ts,vue}'] },
	//**文件匹配**：`files` 属性指定了哪些文件类型（JavaScript、TypeScript、Vue 文件等）将应用这些规则

	{ languageOptions: { globals: { ...globals.browser, ...globals.node, ...eslintAutoImport.globals } } },
	// 全局变量**：`languageOptions` 配置了浏览器环境下的全局变量。

	pluginJs.configs.recommended,
	// 引入 `@eslint/js` 插件的推荐规则

	...tseslint.configs.recommended,
	// 引入 `typescript-eslint` 插件的推荐规则

	...pluginVue.configs['flat/essential'],
	// 引入`eslint-plugin-vue` 插件的基础规则

	{ 
		files: ['**/*.vue'], 
		languageOptions: { 
			parserOptions: 
			{ 
				parser: tseslint.parser 
			} 
		},
		rules: {
			'vue/no-mutating-props': 'off', // 允许props修改
			'vue/one-component-per-file': 'off', // 单文件多组件节点
			'vue/multi-word-component-names': 'off', // vue组件名要2个
		}
	},
	// 针对 Vue 文件配置，为 `.vue` 文件指定了 TypeScript 解析器

	{
		name: 'project-base',
		rules: {      
			indent: ['error', 'tab'], // 使用tab作为缩进
			'prefer-const': 'error', // 未改变的变量使用const声明
			'no-unused-vars': 'error', // 声明但是不使用的变量
			semi: ['error', 'never'], // always允许分号；never不允许分号
			quotes: ['error', 'single', { allowTemplateLiterals: true }], // double双引号，single单引号，backtick模板字符串
			'@typescript-eslint/no-explicit-any': 'off', // ts不使用any
			'@typescript-eslint/no-unused-expressions': 'off', // 可以使用短路计算
			'@typescript-eslint/no-empty-object-type': 'off', // 禁止空表达如 try {...} catch{}
		},
	},
	{
		ignores: ['node_modules', './git', '/src/typings/*.d.ts', 'dist'],
		// 全局忽略文件
	},
]