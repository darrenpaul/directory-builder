import { serverSupabaseServiceRole } from '#supabase/server'
import { createPlaceRequest } from '~~/database/place-request'

export default defineEventHandler(async (event) => {
	const supabase = serverSupabaseServiceRole(event)

	const userIpAddress = event.node.req.headers['x-forwarded-for']

	const body = await readBody(event)

	if (
		!body.companyName
		|| !body.country
		|| !body.city
		|| !body.userEmailAddress
	) {
		throw createError({
			statusCode: 400,
			statusMessage: 'Missing required fields',
		})
	}

	const { error } = await createPlaceRequest(supabase, {
		...body,
		userIpAddress,
	})

	if (error) {
		throw createError({
			statusCode: 500,
			statusMessage: error.message,
		})
	}

	return { message: 'Successfully created coffee shop request' }
})
