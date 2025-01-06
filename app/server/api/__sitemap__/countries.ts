import type { asSitemapUrl } from '#imports'
import { defineSitemapEventHandler } from '#imports'
import { kebabCase } from 'lodash-es'
import { countryApiRoute } from '~~/constants/routes-api'
import { countryRoute } from '~/constants/routes'

export default defineSitemapEventHandler(async () => {
	const countries = await $fetch<ReturnType<typeof asSitemapUrl>>(
		countryApiRoute.path,
	)

	return countries.map(({ country }) => `${countryRoute.path}/${kebabCase(country)}`)
})
