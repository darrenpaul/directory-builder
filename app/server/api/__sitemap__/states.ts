import type { asSitemapUrl } from '#imports'
import { defineSitemapEventHandler } from '#imports'
import { stateApiRoute } from '~~/constants/routes-api'
import { listingRoute } from '~/constants/routes'
import { joinUrlDirectories } from '~/lib/url-directory-join'

export default defineSitemapEventHandler(async () => {
	const states = await $fetch<ReturnType<typeof asSitemapUrl>>(
		stateApiRoute.path,
	)

	return states.map(({ country, state }) =>
		joinUrlDirectories([listingRoute.path, country, state]),
	)
})
