import Stripe from 'stripe'

const { stripeSecretKey } = useRuntimeConfig()

// DOCUMENTATION
// https://stripe.com/docs/api/checkout/sessions
export const stripe = new Stripe(stripeSecretKey, {
	apiVersion: '2024-04-10',
	appInfo: {
		// For sample support and debugging, not required for production:
		name: 'stripe-samples/accept-a-payment/payment-element',
		version: '0.0.2',
		url: 'https://github.com/stripe-samples',
	},
})
