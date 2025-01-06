import { serverSupabaseServiceRole } from '#supabase/server'
import { getStates } from '~~/database/state'

export default defineEventHandler(async (event) => {
	const supabase = serverSupabaseServiceRole(event)

	const { data } = await getStates(supabase)

	return data
})
