import type { asSitemapUrl } from '#imports'
import { defineSitemapEventHandler } from '#imports'
import { kebabCase } from 'lodash-es'
import { placeApiRoute } from '~~/constants/routes-api'
import { cityRoute, countryRoute, stateRoute } from '~/constants/routes'

export default defineSitemapEventHandler(async () => {
	const places = await $fetch<ReturnType<typeof asSitemapUrl>>(
		placeApiRoute.path,
	)

	return places.map(({ address, slug }) => `${countryRoute.path}/${kebabCase(address.country)}${stateRoute.path}/${kebabCase(address.state)}${cityRoute.path}/${kebabCase(address.city)}/${slug}`)
})
