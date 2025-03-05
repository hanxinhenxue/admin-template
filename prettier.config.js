export default {
	printWidth: 150, //每行最大长度
	tabWidth: 0, //缩进
	useTabs: true, //是否使用制表符
	semi: false, // 未尾分号
	singleQuote: true, // 单引号
	quoteProps: 'as-needed', //引用对象中的属性时更改 as-needed 仅在需要时在对象属性周围添加引号 | consistent 如果对象中至少有一个属性需要引号，则将所有属性都引号化 |  preserve 尊重对象属性中引号的输入用法
	jsxSingleQuote: false, // jsx中使用单引号
	trailingComma: 'es5', // 尾逗号 es5|none|all
	bracketSpacing: true, //对象文本中括号之间的打印空格
	bracketSameLine: true, // 将多行HTML（HTML，JSX，Vue，Angular）元素的 > 放在最后一行的末尾，而不是单独放在下一行
	jsxBracketSameLine: true, // jsx中将 > 放在最后一行的末尾，而不是单独放在下一行
	arrowParens: 'always', // 在唯一的箭头函数参数周围包括括号 always|avoid
	htmlWhitespaceSensitivity: 'strict', // 全局空白敏感性
	vueIndentScriptAndStyle: true, //vue文件缩进
	endOfLine: 'auto', // 换行 lf|crlf|cr|auto 默认lf
	embeddedLanguageFormatting: 'auto', // 是否格式化文件中嵌入的引用代码
	singleAttributePerLine: false, // 在HTML、Vue和JSX中强制每行使用一个属性

	insertPragma: false,
	requirePragma: false,
	proseWrap: 'never'
}
