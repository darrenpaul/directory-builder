import type { asSitemapUrl } from '#imports'
import { defineSitemapEventHandler } from '#imports'
import { blogsApiRoute } from '~~/constants/routes-api'
import { blogsRoute } from '~/constants/routes'
import { joinUrlDirectories } from '~/lib/url-directory-join'

export default defineSitemapEventHandler(async () => {
	const places = await $fetch<ReturnType<typeof asSitemapUrl>>(
		blogsApiRoute.path,
	)

	return places.data.map(({ slug }) =>
		joinUrlDirectories([blogsRoute.path, slug]),
	)
})
