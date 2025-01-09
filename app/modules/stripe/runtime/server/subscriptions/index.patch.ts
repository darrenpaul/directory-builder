import { serverSupabaseServiceRole } from '#supabase/server'
import { createPlaceVerified } from '~~/modules/stripe/runtime/database/place-verified'
import { updateUserSubscription } from '~~/modules/stripe/runtime/database/user-subscription'
import { stripe } from '~~/modules/stripe/runtime/utils/stripe'

export default defineEventHandler(async (event) => {
	const body = await readBody(event)

	const { stripeSessionId } = body

	if (!stripeSessionId) {
		throw createError({
			statusCode: 400,
			statusMessage: 'Missing required fields.',
		})
	}

	const session = await stripe.checkout.sessions.retrieve(stripeSessionId)

	const supabaseAdmin = serverSupabaseServiceRole(event)

	const { data, error } = await updateUserSubscription(supabaseAdmin, {
		stripeSessionId,
		stripeSubscriptionId: session?.subscription as string,
		paymentStatus: session.payment_status,
	})

	if (error) {
		throw createError({
			statusCode: 500,
			statusMessage: error.message,
		})
	}

	if (!data) {
		throw createError({
			statusCode: 500,
			statusMessage: 'Unknown error',
		})
	}

	await createPlaceVerified(supabaseAdmin, {
		placeId: data.placeId,
	})

	return {
		message: 'Payment updated successfully.',
	}
})
