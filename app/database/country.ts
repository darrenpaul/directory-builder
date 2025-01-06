import type { SupabaseClient } from '@supabase/supabase-js'
import { DatabaseView } from '~~/constants/database-table'

export async function getCountries(supabaseClient: SupabaseClient) {
	const selectString = ['country'].join(',')

	return supabaseClient
		.from(DatabaseView.COUNTRY)
		.select(selectString)
		.returns<{ country: string }[]>()
}
