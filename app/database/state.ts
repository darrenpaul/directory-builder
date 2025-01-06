import type { SupabaseClient } from '@supabase/supabase-js'
import { DatabaseView } from '~~/constants/database-table'

export async function getStates(
	supabaseClient: SupabaseClient,
) {
	const selectString = ['country', 'state'].join(
		',',
	)

	return supabaseClient
		.from(DatabaseView.STATE)
		.select(selectString)
		.returns<{ country: string, state: string }[]>()
}
