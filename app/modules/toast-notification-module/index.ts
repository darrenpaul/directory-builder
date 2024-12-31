import { addComponentsDir, createResolver, defineNuxtModule } from 'nuxt/kit'

export default defineNuxtModule({
	defaults: {
		activateObserver: true,
	},
	setup() {
		const { resolve } = createResolver(import.meta.url)
		addComponentsDir({
			path: resolve('runtime/components'),
			global: true,
		})
	},
})
