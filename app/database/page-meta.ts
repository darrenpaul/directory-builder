import type { SupabaseClient } from '@supabase/supabase-js'
import type { PageMeta } from '~~/types/page-meta'
import { DatabaseTable } from '~~/constants/database-table'

export async function getPageMeta(
	supabaseClient: SupabaseClient,
	slug: string,
) {
	const selectString = ['id', 'slug', 'title', 'description', 'image'].join(
		',',
	)

	return supabaseClient
		.from(DatabaseTable.PAGE_META)
		.select(selectString)
		.eq('slug', slug)
		.maybeSingle<PageMeta>()
}
