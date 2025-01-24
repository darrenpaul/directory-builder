import type { asSitemapUrl } from '#imports'
import { defineSitemapEventHandler } from '#imports'
import { cityApiRoute } from '~~/constants/routes-api'
import { listingRoute } from '~/constants/routes'
import { joinUrlDirectories } from '~/lib/url-directory-join'

export default defineSitemapEventHandler(async () => {
	const cities = await $fetch<ReturnType<typeof asSitemapUrl>>(
		cityApiRoute.path,
	)

	return cities.map(({ country, state, city }) =>
		joinUrlDirectories([listingRoute.path, country, state, city]),
	)
})
