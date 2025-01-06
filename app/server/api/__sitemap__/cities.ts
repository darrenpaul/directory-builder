import type { asSitemapUrl } from '#imports'
import { defineSitemapEventHandler } from '#imports'
import { kebabCase } from 'lodash-es'
import { cityApiRoute } from '~~/constants/routes-api'
import { cityRoute, countryRoute, stateRoute } from '~/constants/routes'

export default defineSitemapEventHandler(async () => {
	const cities = await $fetch<ReturnType<typeof asSitemapUrl>>(
		cityApiRoute.path,
	)

	return cities.map(({ country, state, city }) => `${countryRoute.path}/${kebabCase(country)}${stateRoute.path}/${kebabCase(state)}${cityRoute.path}/${kebabCase(city)}`)
})
