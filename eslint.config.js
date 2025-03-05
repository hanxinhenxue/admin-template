import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginVue from "eslint-plugin-vue";
import unocss from '@unocss/eslint-config/flat'


/** @type {import('eslint').Linter.Config[]} */
export default [
  unocss,
  {files: ["**/*.{js,mjs,cjs,ts,vue}"]},
  {languageOptions: { globals: {...globals.browser, ...globals.node} }},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs["flat/essential"],
  {files: ["**/*.vue"], languageOptions: {parserOptions: {parser: tseslint.parser}}},
	{
		rules: {
			'@typescript-eslint/no-explicit-any': 'off', // ts不使用any
			'@typescript-eslint/no-unused-expressions': 'off', // 可以使用短路计算
			'@typescript-eslint/no-empty-object-type': 'off',
			'no-unused-vars': 'off',
			'@typescript-eslint/no-unused-vars': 'error',
		},
	},
	{
		ignores: ['node_modules', './git', '/src/typings/*.d.ts', 'dist'],
	},
];