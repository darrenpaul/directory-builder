import type { asSitemapUrl } from '#imports'
import { defineSitemapEventHandler } from '#imports'
import { adminPlaceApiRoute } from '~~/constants/routes-api'
import { joinUrlDirectories } from '~/lib/url-directory-join'

export default defineSitemapEventHandler(async () => {
	const places = await $fetch<ReturnType<typeof asSitemapUrl>>(
		adminPlaceApiRoute.path,
	)

	return places.map(({ address, slug }) =>
		joinUrlDirectories([address.country, address.state, address.city, slug]),
	)
})
