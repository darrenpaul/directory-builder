// `nuxt/kit` is a helper subpath import you can use when defining local modules
// that means you do not need to add `@nuxt/kit` to your project's dependencies
import {
	addLayout,
	addServerHandler,
	createResolver,
	defineNuxtModule,
	extendPages,
} from 'nuxt/kit'
import { stripeSubscriptionsApiRoute } from '~~/modules/stripe/runtime/constants/routes-api'

export default defineNuxtModule({
	setup() {
		const { resolve } = createResolver(import.meta.url)
		addLayout(
			{
				src: resolve('./runtime/layouts/stripe.vue'),
			},
			'stripe',
		)
		extendPages((pages) => {
			pages.unshift({
				name: 'stripe-success',
				path: '/stripe/success',
				file: resolve('runtime/pages/success.vue'),
			})
		})
		addServerHandler({
			route: stripeSubscriptionsApiRoute.path,
			handler: resolve('./runtime/server/subscriptions/index.post.ts'),
		})
		addServerHandler({
			route: stripeSubscriptionsApiRoute.path,
			handler: resolve('./runtime/server/subscriptions/index.patch.ts'),
		})
	},
})
