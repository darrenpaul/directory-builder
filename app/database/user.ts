import type { SupabaseClient } from '@supabase/supabase-js'

export async function getAuthenticatedUser(supabaseClient: SupabaseClient) {
	const { data } = await supabaseClient.auth.getUser()
	if (!data.user) {
		throw createError({
			statusCode: 401,
			statusMessage: 'Unauthorized',
		})
	}

	return data.user
}
