import type { asSitemapUrl } from '#imports'
import { defineSitemapEventHandler } from '#imports'
import { countryApiRoute } from '~~/constants/routes-api'
import { listingRoute } from '~/constants/routes'
import { joinUrlDirectories } from '~/lib/url-directory-join'

export default defineSitemapEventHandler(async () => {
	const countries = await $fetch<ReturnType<typeof asSitemapUrl>>(
		countryApiRoute.path,
	)

	return countries.map(({ country }) =>
		joinUrlDirectories([listingRoute.path, country]),
	)
})
