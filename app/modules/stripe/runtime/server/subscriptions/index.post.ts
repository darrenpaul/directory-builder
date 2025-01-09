import {
	serverSupabaseClient,
	serverSupabaseServiceRole,
} from '#supabase/server'
import { getAuthenticatedUser } from '~~/modules/stripe/runtime/database/user'
import { createUserSubscription } from '~~/modules/stripe/runtime/database/user-subscription'
import { stripe } from '~~/modules/stripe/runtime/utils/stripe'

const { stripeRedirectUri } = useRuntimeConfig()

export default defineEventHandler(async (event) => {
	const supabase = await serverSupabaseClient(event)
	const body = await readBody(event)

	const { priceId, placeId } = body

	if (!priceId || !placeId) {
		throw createError({
			statusCode: 400,
			statusMessage: 'Missing required fields.',
		})
	}

	const user = await getAuthenticatedUser(supabase)

	if (!user) {
		throw createError({
			statusCode: 401,
			statusMessage: 'Unauthorized.',
		})
	}

	const session = await stripe.checkout.sessions.create({
		mode: 'subscription',
		customer_email: user.email,
		line_items: [
			{
				price: priceId,
				quantity: 1,
			},
		],
		success_url: `${stripeRedirectUri}/?session_id={CHECKOUT_SESSION_ID}`,
		cancel_url: `${stripeRedirectUri}/subscription/canceled`,
	})

	const supabaseAdmin = serverSupabaseServiceRole(event)

	const { error } = await createUserSubscription(supabaseAdmin, {
		userId: user.id,
		placeId,
		stripeSessionId: session.id,
		paymentStatus: session.payment_status,
	})

	if (error) {
		throw createError({
			statusCode: 500,
			statusMessage: error.message,
		})
	}

	return {
		redirectUri: session.url,
		message: 'Payment created successfully.',
	}
})
