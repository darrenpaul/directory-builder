import { serverSupabaseServiceRole } from '#supabase/server'
import { getAttributeOptions } from '~~/database/attribute-option'

export default defineEventHandler(async (event) => {
	const supabase = serverSupabaseServiceRole(event)

	const { data, error } = await getAttributeOptions(supabase)

	if (error) {
		throw createError({
			statusCode: 500,
			statusMessage: error.message,
		})
	}

	return data
})
