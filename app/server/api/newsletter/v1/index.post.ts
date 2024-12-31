import { serverSupabaseServiceRole } from '#supabase/server'
import isEmail from 'validator/lib/isEmail'
import { createNewsletter } from '~~/database/newsletter'

export default defineEventHandler(async (event) => {
	const supabase = serverSupabaseServiceRole(event)

	const clientIpAddress = event.node.req.headers['x-forwarded-for']

	const body = await readBody(event)

	const { emailAddress } = body

	if (!isEmail(emailAddress)) {
		throw createError({
			statusCode: 400,
			statusMessage: 'Invalid email address',
		})
	}

	return await createNewsletter(supabase, {
		emailAddress,
		ipAddress: clientIpAddress as string,
	})
})
