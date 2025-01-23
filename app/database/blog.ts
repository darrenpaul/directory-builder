import type { SupabaseClient } from '@supabase/supabase-js'
import type { Blog } from '~~/types/blog'
import { DatabaseTable } from '~~/constants/database-table'

export async function createBlog(
	supabaseClient: SupabaseClient,
	payload: {
		title: string
		slug: string
		ownerId: string
	},
) {
	const now = new Date()

	return await supabaseClient
		.from(DatabaseTable.BLOG)
		.insert({
			title: payload.title,
			slug: payload.slug,
			owner_id: payload.ownerId,
			project_id: process.env.NUXT_PUBLIC_PROJECT_ID,
			created_at: now,
			updated_at: now,
		})
		.select('id, slug')
		.single<{ id: string, slug: string }>()
}

export async function updateBlogBySlug(
	supabaseClient: SupabaseClient,
	payload: {
		title: string
		content: string
		description: string
		thumbnailUri: string
	},
) {
	const now = new Date()

	return await supabaseClient
		.from(DatabaseTable.BLOG)
		.update({
			title: payload.title,
			content: payload.content,
			description: payload.description,
			thumbnail_uri: payload.thumbnailUri,
			updated_at: now,
		})
		.eq('slug', payload.slug)
		.select('id, slug')
		.single<{ id: string, slug: string }>()
}

export async function getBlogs(supabaseClient: SupabaseClient) {
	const selectString = [
		'id',
		'title',
		'slug',
		'description',
		'thumbnailUri:thumbnail_uri',
		'createdAt:created_at',
	].join(',')

	return supabaseClient
		.from(DatabaseTable.BLOG)
		.select(selectString)
		.returns<Blog[]>()
}

export async function findBlogBySlug(
	supabaseClient: SupabaseClient,
	slug: string,
) {
	const selectString = [
		'id',
		'title',
		'slug',
		'content',
		'description',
		'thumbnailUri:thumbnail_uri',
		'createdAt:created_at',
	].join(',')

	return supabaseClient
		.from(DatabaseTable.BLOG)
		.select(selectString)
		.eq('slug', slug)
		.maybeSingle<Blog>()
}
