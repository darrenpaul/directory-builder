<script setup lang="ts">
import type { PageMeta } from '~~/types/page-meta'
import type { Place } from '~~/types/place'
import { pageMetaApiRoute, placesApiRoute } from '~~/constants/routes-api'
import settings from '~~/constants/settings'
import Filter from '~/components/filter.vue'
import PageLander from '~/components/page-lander.vue'
import PlaceList from '~/components/place-list.vue'
import UrlQueryBuilder from '~/lib/builders/url-query-builder'

const initialLimit = 10

const route = useRoute()
const limit = ref<number>(initialLimit)

const urlQueryBuilder = new UrlQueryBuilder(placesApiRoute.path)
const pageMetaUrlQueryBuilder = new UrlQueryBuilder(pageMetaApiRoute.path)

const queryUrl = computed(() => {
	const paramsAndQueries = {
		...(route?.params as Record<string, string>),
		...(route.query as Record<string, string>),
	}

	return urlQueryBuilder
		.withBusinessName(paramsAndQueries)
		.withCityName(paramsAndQueries)
		.withPostalCode(paramsAndQueries)
		.withUrlQueryKeys(paramsAndQueries)
		.withLimit({ limit: limit.value })
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

const [{ data, error }, { data: pageMetaData }]
  = await Promise.all(fetchPromises)

if (error.value) {
	throw createError({
		statusCode: 500,
		statusMessage: error.value?.message,
	})
}

async function onLoadMore() {
	limit.value += initialLimit
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
	title: pageMetaData.value?.title || 'Nearby Nearby',
	ogTitle: pageMetaData.value?.title || 'Nearby Nearby',
	description: pageMetaData.value?.description || 'Nearby Nearby',
	ogDescription: pageMetaData.value?.description || 'Nearby Nearby',
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
		<PageLander />

		<div class="max-h-96 h-auto mb-8">
			<!-- <ScriptGoogleAdsense
				:data-ad-client="googleAdsenseId"
				data-ad-slot="8638864193"
			/> -->
		</div>

		<div class="w-full max-w-screen-2xl mx-auto px-4">
			<Filter />

			<div class="border-b border-neutral-200 pb-3 mb-6">
				<PlaceList
					v-if="data.data"
					key-id="latest"
					class="mb-4"
					:places="data.data"
					label="Latest Coffee Shops"
				/>

				<button
					v-if="data.count > limit"
					class="btn btn-block btn-neutral btn-outline"
					@click="onLoadMore"
				>
					Load More
				</button>
			</div>

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
