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
				project_id: payload.directoryId,
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
			project_id: payload.directoryId,
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

	const [
		{ data: defaultPageMeta, error: defaultPageMetaError },
		{ data: matchedPageMeta, error: matchedPageMetaError },
	] = await Promise.all([
		supabaseClient
			.from(DatabaseTable.PAGE_META)
			.select(selectString)
			.eq('slug', `home-${process.env.NUXT_PUBLIC_PROJECT_KEY}`)
			.eq('project_id', process.env.NUXT_PUBLIC_PROJECT_ID)
			.maybeSingle<PageMeta>(),
		supabaseClient
			.from(DatabaseTable.PAGE_META)
			.select(selectString)
			.eq('slug', slug)
			.eq('project_id', process.env.NUXT_PUBLIC_PROJECT_ID)
			.maybeSingle<PageMeta>(),
	])

	if (matchedPageMeta) {
		return { data: matchedPageMeta, error: matchedPageMetaError }
	}

	return { data: defaultPageMeta, error: defaultPageMetaError }
}
