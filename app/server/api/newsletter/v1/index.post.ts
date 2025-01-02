import { serverSupabaseServiceRole } from '#supabase/server'
import { createNewsletter } from '~~/database/newsletter'

export default defineEventHandler(async (event) => {
	const supabase = serverSupabaseServiceRole(event)

	const clientIpAddress = event.node.req.headers['x-forwarded-for']

	const body = await readBody(event)

	const { emailAddress } = body

	const emailRegex = /^[\w.%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i

	if (!emailRegex.test(emailAddress)) {
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
