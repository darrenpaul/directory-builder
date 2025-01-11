import type { SupabaseClient } from '@supabase/supabase-js'
import { DatabaseView } from '~~/constants/database-table'

export async function getAttributeOptions(supabaseClient: SupabaseClient) {
	const selectString = ['key', 'label'].join(',')

	return supabaseClient
		.from(DatabaseView.ATTRIBUTE_OPTIONS_VIEW)
		.select(selectString)
		.returns<{ key: string, label: string }[]>()
}
