import type { asSitemapUrl } from '#imports'
import { defineSitemapEventHandler } from '#imports'
import { kebabCase } from 'lodash-es'
import { stateApiRoute } from '~~/constants/routes-api'
import { countryRoute, stateRoute } from '~/constants/routes'

export default defineSitemapEventHandler(async () => {
	const states = await $fetch<ReturnType<typeof asSitemapUrl>>(
		stateApiRoute.path,
	)

	return states.map(({ country, state }) => `${countryRoute.path}/${kebabCase(country)}${stateRoute.path}/${kebabCase(state)}`)
})
