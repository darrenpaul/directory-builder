<script setup lang="ts">
import type { PageMeta } from '~~/types/page-meta'
import type { Place } from '~~/types/place'
import { pageMetaApiRoute, placeApiRoute } from '~~/constants/routes-api'
import settings from '~~/constants/settings'
import PageLander from '~/components/page-lander.vue'
import PlaceList from '~/components/place-list.vue'
import SearchInput from '~/components/search-input.vue'
import UrlQueryBuilder from '~/lib/builders/url-query-builder'

const route = useRoute()
const router = useRouter()

const queryBusinessName = ref<string | undefined>(
	(route.query.businessName as string) || undefined,
)
const queryCountryName = ref<string | undefined>(
	(route.query.countryName as string) || undefined,
)
const queryCityName = ref<string | undefined>(
	(route.query.cityName as string) || undefined,
)

const urlQueryBuilder = new UrlQueryBuilder(placeApiRoute.path)
const pageMetaUrlQueryBuilder = new UrlQueryBuilder(pageMetaApiRoute.path)

const queryUrl = computed(() => {
	const queryParams = route?.query as Record<string, string>

	return urlQueryBuilder
		.withBusinessName(queryParams)
		.withCountryName(queryParams)
		.withCityName(queryParams)
		.build()
})

const [{ data: placeData, error: placeError }, { data: pageMetaData }]
  = await Promise.all([
  	useFetch<Place[]>(queryUrl, { method: 'GET', watch: [queryUrl] }),
  	useFetch<PageMeta>(
  		pageMetaUrlQueryBuilder.withSlug({ slug: 'home' }).build(),
  		{ method: 'GET' },
  	),
  ])

if (placeError.value) {
	throw createError({
		statusCode: 500,
		statusMessage: placeError.value?.message,
	})
}

async function onSearch() {
	const queryParams = {
		...route.query,
	}

	if (queryBusinessName.value) {
		queryParams.businessName = queryBusinessName.value
	}
	else {
		delete queryParams.businessName
	}

	if (queryCountryName.value) {
		queryParams.countryName = queryCountryName.value
	}
	else {
		delete queryParams.countryName
	}

	if (queryCityName.value) {
		queryParams.cityName = queryCityName.value
	}
	else {
		delete queryParams.cityName
	}

	router.push({
		query: queryParams,
	})
}

const countryNames = computed(() => {
	const countries: string[] = []

	if (!placeData.value) {
		return []
	}

	placeData.value.forEach((place) => {
		if (!countries.includes(place.address.country)) {
			countries.push(place.address.country)
		}
	})

	return countries
})

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

		<!-- <ul class="list-disc list-inside text-left">
<li>
Search 50,000+ coffee shops across 2,000 cities
</li>
<li>
Filter by features: Wi-Fi, late hours, workspace-friendly
</li>
<li>
Find shops open now near your location
</li>
<li>
Browse local favorites in popular cities like London, New York, and Amsterdam
</li>
<li>
Perfect for digital nomads, students, and coffee enthusiasts
</li>
</ul> -->

		<div class="w-full max-w-screen-2xl mx-auto px-4">
			<div
				id="search-form"
				class="flex flex-col lg:flex-row gap-4 items-end w-full mb-8"
			>
				<SearchInput
					id="business-name"
					v-model="queryBusinessName"
					placeholder="Enter a business name"
				/>

				<SearchInput
					id="country-name"
					v-model="queryCountryName"
					placeholder="Enter a country name"
				/>

				<SearchInput
					id="city-name"
					v-model="queryCityName"
					placeholder="Enter a city name"
				/>

				<button
					type="button"
					class="btn w-full lg:w-fit btn-lg btn-neutral"
					@click="onSearch"
				>
					Search
				</button>
			</div>

			<PlaceList
				v-if="placeData"
				key-id="latest"
				class="mb-8"
				:places="placeData.slice(0, 10)"
				label="Latest Coffee Shops"
			/>

			<template v-for="country in countryNames" :key="country">
				<PlaceList
					v-if="placeData"
					:key-id="country"
					class="mb-8"
					:places="
						placeData.filter((place) => place.address.country === country)
					"
					:label="`Coffee Shops in ${country}`"
				/>
			</template>
		</div>
	</div>
</template>
