import type { SupabaseClient } from '@supabase/supabase-js'
import type { PageMeta } from '~~/types/page-meta'
import { DatabaseTable } from '~~/constants/database-table'

export async function createPageMeta(
	supabaseClient: SupabaseClient,
	payload: {
		slug: string
		image: string
		title: string
		description: string
		directoryId: string
	},
) {
	const now = new Date()

	const { data, error } = await supabaseClient
		.from(DatabaseTable.PAGE_META)
		.upsert(
			{
				slug: payload.slug,
				image: payload.image,
				title: payload.title,
				description: payload.description,
				directory_id: payload.directoryId,
				created_at: now,
				updated_at: now,
			},
			{ onConflict: 'slug' },
		)
		.select('id')
		.single<{ id: string }>()

	if (error) {
		return { data, error }
	}

	return await supabaseClient
		.from(DatabaseTable.PAGE_META)
		.update({
			slug: payload.slug,
			image: payload.image,
			title: payload.title,
			description: payload.description,
			directory_id: payload.directoryId,
			updated_at: now,
		})
		.eq('id', data.id)
}

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
		.eq('directory_id', process.env.DIRECTORY_ID)
		.maybeSingle<PageMeta>()
}
