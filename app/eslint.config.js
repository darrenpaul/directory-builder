import antfu from '@antfu/eslint-config'

export default antfu({
	stylistic: {
		indent: 'tab',
		quotes: 'single',
	},

	typescript: true,
	vue: true,

	jsonc: false,
	yaml: false,

	ignores: [],

	rules: {
		'node/prefer-global/process': 'off',
		'ts/no-require-imports': 'off',
		'no-console': 'error',
	},
})
