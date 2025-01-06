import { serverSupabaseServiceRole } from '#supabase/server'
import { getCountries } from '~~/database/country'

export default defineEventHandler(async (event) => {
	const supabase = serverSupabaseServiceRole(event)

	const { data } = await getCountries(supabase)

	return data
})
