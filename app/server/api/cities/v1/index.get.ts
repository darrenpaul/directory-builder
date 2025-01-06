import { serverSupabaseServiceRole } from '#supabase/server'
import { getCities } from '~~/database/city'

export default defineEventHandler(async (event) => {
	const supabase = serverSupabaseServiceRole(event)

	const { data } = await getCities(supabase)

	return data
})
