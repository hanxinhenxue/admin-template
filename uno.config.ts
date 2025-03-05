import { defineConfig, presetAttributify, transformerVariantGroup, presetWind3 } from 'unocss'
import transformerDirective from '@unocss/transformer-directives'
export default defineConfig({
	// 排除文件
	content: {
		pipeline: {
			exclude: ['node_modules', 'dist', '.git', '.husky', '.vscode', 'public', 'build']
		}
	},
	presets: [presetWind3({ dark: 'class' }), presetAttributify()],
	transformers: [transformerVariantGroup(), transformerDirective()],
	shortcuts: [
		['wh-full', 'w-full h-full'],
		['flex-center', 'flex justify-center items-center'],
		['flex-col', 'flex flex-col'],
		['flex-col-center', 'flex-center flex-col'],
		['flex-between', 'flex justify-between items-center'],
		['flex-around', 'flex justify-around items-center'],
		['flex-x-center', 'flex justify-center'],
		['flex-y-center', 'flex items-center'],
		['abs', 'absolute'],
		['rlt', 'relative'],
		['abs-lt', 'absolute left-0 top-0'],
		['abs-rt', 'absolute right-0 top-0']
	],
	rules: [
		[
			'abs-center',
			{
				position: 'absolute',
				top: '50%',
				left: '50%',
				transform: 'translate(-50%, -50%)'
			}
		],
		[
			'all',
			{
				transition: 'all 0.2s ease-in-out'
			}
		],
		['card-shadow', { 'box-shadow': '10px 10px 10px #d1d9e6, -10px -10px 10px #f9f9f9' }],
		['header-border', { 'border-bottom': '1px solid #eee' }]
	],
	theme: {
		colors: {
			primary: 'var(--primary-color)',
			dark: '#18181c'
		},
		breakpoints: {
			xs: '320px',
			sm: '640px',
			md: '768px',
			lg: '1024px',
			xl: '1280px',
			'2xl': '1536px',
			'3xl': '1920px'
		}
	}
})
