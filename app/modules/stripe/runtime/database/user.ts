import type { SupabaseClient } from '@supabase/supabase-js'

export async function getAuthenticatedUser(supabase: SupabaseClient) {
	const { data, error } = await supabase.auth.getUser()

	if (error) {
		return null
	}

	const { user } = data

	return user
}
