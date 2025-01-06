import type { SupabaseClient } from '@supabase/supabase-js'
import { DatabaseView } from '~~/constants/database-table'

export async function getCities(
	supabaseClient: SupabaseClient,
) {
	const selectString = ['country', 'state', 'city'].join(
		',',
	)

	return supabaseClient
		.from(DatabaseView.CITY)
		.select(selectString)
		.returns<{ country: string, state: string, city: string }[]>()
}
