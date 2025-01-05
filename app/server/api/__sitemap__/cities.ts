import type { asSitemapUrl } from '#imports'
import { defineSitemapEventHandler } from '#imports'
import { kebabCase } from 'lodash-es'
import { placeApiRoute } from '~~/constants/routes-api'

export default defineSitemapEventHandler(async () => {
	const places = await $fetch<ReturnType<typeof asSitemapUrl>>(
		placeApiRoute.path,
	)

	return places.map(
		({ address }) =>
			`/country/${kebabCase(address.country)}/city/${kebabCase(address.city)}`,
	)
})
