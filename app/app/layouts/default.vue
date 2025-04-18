<script setup lang="ts">
import type { City } from '~~/types/city'
import type { Country } from '~~/types/country'
import type { State } from '~~/types/state'
import {
	cityApiRoute,
	countryApiRoute,
	stateApiRoute,
} from '~~/constants/routes-api'
import {
	Toaster,
	useToaster,
} from '~~/modules/toast-notification-module/runtime'
import Footer from '~/components/footer.vue'
import Navigation from '~/components/navigation.vue'
// import SearchByList from '~/components/search-by/search-by-list.vue'
import useFilters from '~/composables/use-filters'

import {
	searchByLinkForCities,
	searchByLinkForCountries,
	searchByLinkForStates,
} from '~/lib/search-by-link'

const { fetchAttributeOptions } = useFilters()

await fetchAttributeOptions()

const fetchPromises = []

fetchPromises.push(
	useFetch<Country[]>(countryApiRoute.path, { method: 'GET' }),
)
fetchPromises.push(useFetch<State[]>(stateApiRoute.path, { method: 'GET' }))
fetchPromises.push(useFetch<City[]>(cityApiRoute.path, { method: 'GET' }))

const [{ data: countryData }, { data: stateData }, { data: cityData }]
  = await Promise.all(fetchPromises)

const { notification } = useToaster()
</script>

<template>
	<div>
		<Toaster :notification="notification" />

		<Navigation />

		<slot />

		<div
			class="w-full grid grid-cols-1 lg:grid-cols-3 max-w-screen-2xl mx-auto px-4 mb-6"
		>
			<LazySearchByList
				id="countries"
				class="mb-4"
				:search-by-links="searchByLinkForCountries(countryData!)"
				label="What country are you looking in?"
			/>

			<LazySearchByList
				id="states"
				class="mb-4"
				:search-by-links="searchByLinkForStates(stateData!)"
				label="What state are you looking in?"
			/>

			<LazySearchByList
				id="cities"
				class="mb-4"
				:search-by-links="searchByLinkForCities(cityData!)"
				label="What city are you looking in?"
			/>
		</div>
		<Footer />
	</div>
</template>
