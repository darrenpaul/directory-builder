import type { SupabaseClient } from '@supabase/supabase-js'
import { DatabaseTable } from '~~/modules/stripe/runtime/constants/database-table'

export async function createUserSubscription(
	supabaseClient: SupabaseClient,
	payload: {
		userId: string
		placeId: string
		stripeSessionId: string
		paymentStatus: string
	},
) {
	const now = new Date()

	return await supabaseClient.from(DatabaseTable.USER_SUBSCRIPTION).insert({
		user_id: payload.userId,
		place_id: payload.placeId,
		stripe_session_id: payload.stripeSessionId,
		payment_status: payload.paymentStatus,
		updated_at: now,
		created_at: now,
	})
}

export async function updateUserSubscription(
	supabaseClient: SupabaseClient,
	payload: {
		stripeSessionId: string
		stripeSubscriptionId?: string | null
		paymentStatus: string
	},
) {
	const now = new Date()

	return await supabaseClient
		.from(DatabaseTable.USER_SUBSCRIPTION)
		.update({
			payment_status: payload.paymentStatus,
			stripe_subscription_id: payload.stripeSubscriptionId,
			updated_at: now,
		})
		.eq('stripe_session_id', payload.stripeSessionId)
		.select('placeId:place_id')
		.maybeSingle<{ placeId: string }>()
}
