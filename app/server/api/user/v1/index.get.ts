import { serverSupabaseClient } from '#supabase/server'
import { getAuthenticatedUser } from '~~/database/user'

export default defineEventHandler(async (event) => {
	const supabase = await serverSupabaseClient(event)

	return await getAuthenticatedUser(supabase)
})
