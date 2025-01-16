import type { SupabaseClient } from '@supabase/supabase-js'
import { DatabaseView } from '~~/constants/database-table'

export async function getAttributeOptions(supabaseClient: SupabaseClient) {
	const selectString = ['key', 'label'].join(',')

	return supabaseClient
		.from(DatabaseView.ATTRIBUTE_OPTIONS_VIEW)
		.select(selectString)
		.eq('project_id', process.env.NUXT_PUBLIC_PROJECT_ID)
		.gt('total_count', 1)
		.returns<{ key: string, label: string }[]>()
}
