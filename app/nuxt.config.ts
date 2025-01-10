import { signInRoute } from './app/constants/routes'
import settings from './constants/settings'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: '2024-11-01',
	future: {
		compatibilityVersion: 4,
	},
	devtools: { enabled: true },
	nitro: {
		compressPublicAssets: true,
		prerender: {
			crawlLinks: true,
			routes: ['/sitemap.xml', '/robots.txt'],
		},
	},
	vite: {
		build: {
			cssCodeSplit: false,
			cssMinify: 'lightningcss',
		},
	},
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
		'nuxt-umami',
		'nuxt-tiptap-editor',
	],
	typescript: {
		strict: true,
	},
	runtimeConfig: {
		stripeSecretKey: process.env.STRIPE_SECRET_KEY,
		stripeRedirectUri: process.env.STRIPE_REDIRECT_URI,
		public: {
			stripePublicKey: process.env.NUXT_PUBLIC_STRIPE_PUBLIC_KEY,
			googleMapsApiKey: process.env.NUXT_PUBLIC_GOOGLE_MAPS_API_KEY,
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
			login: signInRoute.path,
			callback: '/confirm',
			include: ['/account(/*)?'],
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
		'/**': { prerender: true },
		'/contact': { isr: 3600 },
	},
	site: {
		url: settings.siteUrl,
		name: settings.siteName,
		defaultLocale: 'en',
	},
	sitemap: {
		gzip: true,
		exclude: [
			'/confirm/**',
			'/auth/**',
			'/account/**',
			'/logout',
			'/stripe/**',
		],
		sources: [
			// '/api/__sitemap__/countries',
			// '/api/__sitemap__/states',
			'/api/__sitemap__/cities',
			'/api/__sitemap__/places',
		],
	},
	schemaOrg: {
		identity: {
			type: 'Organization',
			name: settings.siteName,
			url: settings.siteUrl,
			logo: `${settings.siteUrl}/favicon.png`,
		},
	},
	umami: {
		id: process.env.NUXT_PUBLIC_UMAMI_KEY,
		host: process.env.NUXT_PUBLIC_UMAMI_HOST,
		autoTrack: true,
		// proxy: 'cloak',
		// useDirective: true,
		// ignoreLocalhost: true,
		// excludeQueryParams: false,
		domains: [settings.domain],
		// customEndpoint: '/my-custom-endpoint',
		// logErrors: true,
	},
})
