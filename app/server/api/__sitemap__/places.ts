import type { asSitemapUrl } from '#imports'
import { defineSitemapEventHandler } from '#imports'
import { placesApiRoute } from '~~/constants/routes-api'
import { listingRoute } from '~/constants/routes'
import { joinUrlDirectories } from '~/lib/url-directory-join'

export default defineSitemapEventHandler(async () => {
	const places = await $fetch<ReturnType<typeof asSitemapUrl>>(
		placesApiRoute.path,
	)

	return places.data.map(({ address, slug }) =>
		joinUrlDirectories([
			listingRoute.path,
			address.country,
			address.state,
			address.city,
			slug,
		]),
	)
})
