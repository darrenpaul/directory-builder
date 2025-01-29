import type { SupabaseClient } from '@supabase/supabase-js'

export async function createSeoMetadata(
	supabaseClient: SupabaseClient,
	payload: {
		blogId: string
	},
	table: string,
) {
	const now = new Date()

	return await supabaseClient
		.from(table)
		.insert({
			blog_id: payload.blogId,
			created_at: now,
			updated_at: now,
		})
		.select('id')
		.single<{ id: string }>()
}

export async function updateSeoMetadata(
	supabaseClient: SupabaseClient,
	id: string,
	payload: {
		title: string
		description: string
		blogId: string
	},
	table: string,
) {
	const now = new Date()

	return await supabaseClient
		.from(table)
		.update({
			title: payload.title,
			description: payload.description,
			updated_at: now,
		})
		.eq('id', id)
		.select('id')
		.single<{ id: string }>()
}
