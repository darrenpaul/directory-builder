<script setup lang="ts">
import type { PageMeta } from '~~/types/page-meta'
import type { Place } from '~~/types/place'
import { pageMetaApiRoute, placeApiRoute } from '~~/constants/routes-api'
import settings from '~~/constants/settings'
import Filter from '~/components/filter.vue'
import PageLander from '~/components/page-lander.vue'
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
			href: `${settings.siteUrl}`,
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
	<div class="mb-8">
		<PageLander class="mb-8" />

		<div class="w-full max-w-screen-2xl mx-auto px-4">
			<Filter />

			<PlaceList
				v-if="placeData"
				key-id="latest"
				class="mb-8"
				:places="placeData"
				label="Latest Coffee Shops"
			/>

			<div>
				<p class="text-2xl mb-3">
					Why Choose Nearby Coffee
				</p>
				<ul class="list-disc list-inside text-left">
					<li>Real-time updates on operating hours and locations</li>
					<li>Detailed reviews from local coffee enthusiasts</li>
					<li>Curated lists of specialty roasters and brew methods</li>
					<li>Quick filters for wifi, workspace, and outdoor seating</li>
					<li>Neighborhood-specific coffee guides</li>
				</ul>

				<p>
					Whether you're a local seeking your new favorite spot or a visitor
					exploring Cape Town's coffee scene, Nearby Coffee connects you with
					the perfect café experience.
				</p>
			</div>
		</div>
	</div>
</template>
