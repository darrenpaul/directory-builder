<script setup lang="ts">
import type { PageMeta } from '~~/types/page-meta'
import type { Place } from '~~/types/place'
import { pageMetaApiRoute, placeApiRoute } from '~~/constants/routes-api'
import settings from '~~/constants/settings'
import Filter from '~/components/filter.vue'
import PageBreadcrumbs from '~/components/page-breadcrumbs.vue'
import PlaceList from '~/components/place-list.vue'
import UrlQueryBuilder from '~/lib/builders/url-query-builder'

const route = useRoute()

const urlQueryBuilder = new UrlQueryBuilder(placeApiRoute.path)
const pageMetaUrlQueryBuilder = new UrlQueryBuilder(pageMetaApiRoute.path)

const queryUrl = computed(() => {
	const params = route?.params as Record<string, string>
	const query = route.query as Record<string, string>

	const paramsAndQueries = {
		...params,
		...query,
	}

	return urlQueryBuilder
		.withBusinessName(paramsAndQueries)
		.withCountryName(paramsAndQueries)
		.withCityName(paramsAndQueries)
		.withPostalCode(paramsAndQueries)
		.build()
})

const fetchPromises = []

fetchPromises.push(
	useFetch<Place[]>(queryUrl, { method: 'GET', watch: [queryUrl] }),
)
fetchPromises.push(
	useFetch<PageMeta>(
		pageMetaUrlQueryBuilder.withSlug({ slug: 'home' }).build(),
		{ method: 'GET' },
	),
)

const [{ data: placeData, error: placeError }, { data: pageMetaData }]
  = await Promise.all(fetchPromises)

if (placeError.value) {
	throw createError({
		statusCode: 500,
		statusMessage: placeError.value?.message,
	})
}

useHead({
	link: [
		{
			hid: 'canonical',
			rel: 'canonical',
			href: `${settings.siteUrl}${route.path}`,
		},
	],
})

useSeoMeta({
	title: pageMetaData.value?.title || 'Coffee Nearby',
	ogTitle: pageMetaData.value?.title || 'Coffee Nearby',
	description: pageMetaData.value?.description || 'Coffee Nearby',
	ogDescription: pageMetaData.value?.description || 'Coffee Nearby',
	ogImage: pageMetaData.value?.image || '',
	twitterCard: 'summary_large_image',
})

defineWebPage({
	'@type': 'WebPage',
	'image': pageMetaData.value?.image || '',
})
</script>

<template>
	<div class="py-8">
		<div class="w-full max-w-screen-2xl mx-auto px-4">
			<PageBreadcrumbs :crumbs="[]" />

			<Filter />

			<PlaceList
				v-if="placeData"
				key-id="latest"
				class="mb-8"
				:places="placeData"
				label="Coffee Shops"
			/>
		</div>
	</div>
</template>
