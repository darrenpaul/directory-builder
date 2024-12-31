<script setup lang="ts">
import type { PageMeta } from '~~/types/page-meta'
import type { Place } from '~~/types/place'
import { pageMetaApiRoute, placeApiRoute } from '~~/constants/routes-api'
import settings from '~~/constants/settings'
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

const [{ data: placeData, error: placeError }, { data: pageMetaData }] = await Promise.all(
	[
		useFetch<Place[]>(queryUrl, { method: 'GET', watch: [queryUrl] }),
		useFetch<PageMeta>(
			pageMetaUrlQueryBuilder.withSlug({ slug: 'home' }).build(),
			{ method: 'GET' },
		),
	],
)

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
	title: pageMetaData.value.title,
	ogTitle: pageMetaData.value.title,
	description: pageMetaData.value.description,
	ogDescription: pageMetaData.value.description,
	ogImage: pageMetaData.value.image,
	twitterCard: 'summary_large_image',
})

defineWebPage({
	'@type': 'WebPage',
	'image': pageMetaData.value.image,
})
</script>

<template>
	<div class="mb-8">
		<div class="hero bg-base-200 min-h-screen mb-8">
			<div class="hero-content text-center">
				<div class="w-[80ch]">
					<h1 class="text-5xl font-bold mb-4">
						Find Local Coffee Shops Near You
					</h1>

					<h2 class="mb-4">
						Looking for the perfect coffee spot? NearbyCoffee.info helps you
						find local cafés in any city worldwide. Whether you need a cozy
						study space, a remote work haven, or just your daily caffeine fix,
						we've got you covered.
					</h2>

					<h3 class="mb-4 text-xl">
						Discover Your Next Favorite Coffee Shop
					</h3>

					<NuxtLink to="#search-form" class="btn btn-primary">
						Find Coffee
					</NuxtLink>
				</div>
			</div>
		</div>

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

		<div id="search-form" class="flex gap-4 items-end w-full mb-8">
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

			<button type="button" class="btn btn-lg btn-primary" @click="onSearch">
				Search
			</button>
		</div>

		<PlaceList v-if="placeData" :places="placeData" />
	</div>
</template>
