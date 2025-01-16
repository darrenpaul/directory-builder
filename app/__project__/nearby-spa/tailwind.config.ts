import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
	content: ['./modules/**/*.{html,js,ts,vue}'],
	theme: {
		extend: {
			colors: {},
		},
	},
	plugins: [require('daisyui')],
	daisyui: {
		darkTheme: 'light',
		themes: ['cupcake'],
	},
}
