import settings from './constants/settings'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: '2024-11-01',
	future: {
		compatibilityVersion: 4,
	},
	devtools: { enabled: true },
	modules: [
		'@nuxt/eslint',
		'@nuxtjs/supabase',
		'@nuxtjs/tailwindcss',
		'@nuxt/fonts',
		'@nuxtjs/seo',
		'@nuxt/scripts',
		'@vueuse/nuxt',
		'nuxt-svgo',
		'@nuxt/image',
	],
	typescript: {
		strict: true,
	},
	runtimeConfig: {
		public: {
			posthogPublicKey: process.env.NUXT_PUBLIC_POSTHOT_PUBLIC_KEY,
			posthogHost: process.env.NUXT_PUBLIC_POSTHOT_HOST,
		},
	},
	eslint: {
		config: {
			standalone: false,
		},
	},
	css: ['~~/assets/css/main.css'],
	supabase: {
		url: process.env.NUXT_PUBLIC_SUPABASE_PROJECT_URL,
		key: process.env.NUXT_PUBLIC_SUPABASE_ANON_KEY,
		serviceKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
		redirectOptions: {
			login: '/sign-in',
			callback: '/confirm',
			include: ['/admin(/*)?'],
			cookieRedirect: false,
			exclude: [],
		},
	},
	scripts: {
		registry: {
			googleMaps: {
				apiKey: process.env.NUXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
			},
		},
	},
	routeRules: {
		'/': { prerender: true },
	},
	site: {
		url: settings.siteUrl,
		name: settings.siteName,
		defaultLocale: 'en',
	},
	sitemap: {
		gzip: true,
		exclude: ['/confirm/**'],
		sources: [],
	},
	schemaOrg: {
		identity: {
			type: 'Organization',
			name: settings.siteName,
			url: settings.siteUrl,
			logo: `${settings.siteUrl}/favicon.png`,
		},
	},
})
