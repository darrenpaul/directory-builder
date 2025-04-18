<script setup lang="ts">
import { useGeolocation } from '@vueuse/core'
import IconTrash from '~~/assets/icons/trash.svg'
import { adminPlaceApiRoute } from '~~/constants/routes-api'
import GoogleRating from '~/components/google-rating.vue'
import PriceRating from '~/components/price-rating.vue'
import { googlePlaceRequestFields } from '~/constants/google-place-fields'
import { parseGooglePlace } from '~/lib/google-place'

const { coords } = useGeolocation()

const nearbyPlaces = ref([])
const textQuery = ref<string>()
const latitude = ref<number>()
const longitude = ref<number>()

async function onCenterLocation() {
	latitude.value = coords.value.latitude
	longitude.value = coords.value.longitude
}

async function onFindPlacesNearby() {
	if (!latitude.value || !longitude.value) {
		return
	}

	const center = new google.maps.LatLng(latitude.value, longitude.value)

	const request = {
		fields: googlePlaceRequestFields,
		locationRestriction: {
			center,
			radius: 500,
		},
		includedPrimaryTypes: ['cafe'],
		maxResultCount: 10,
		language: 'en',
		region: 'za',
	}

	const { Place } = (await google.maps.importLibrary(
		'places',
	)) as google.maps.PlacesLibrary

	const { places } = await Place.searchNearby(request)

	if (places.length) {
		const parsedPlaces = places
			.filter(({ servesCoffee }) => servesCoffee)
			.map(parseGooglePlace)

		nearbyPlaces.value = [...nearbyPlaces.value, ...parsedPlaces]
	}
}

async function onSearchByText() {
	if (!textQuery.value) {
		return
	}

	const request = {
		textQuery: textQuery.value,
		fields: googlePlaceRequestFields,
		maxResultCount: 20,
		language: 'en',
		region: 'za',
	}

	const { Place } = (await google.maps.importLibrary(
		'places',
	)) as google.maps.PlacesLibrary

	const { places } = await Place.searchByText(request)

	if (places.length) {
		const parsedPlaces = places.map(parseGooglePlace)

		nearbyPlaces.value = [...nearbyPlaces.value, ...parsedPlaces]
	}
}

function onPlaceRemove(googlePlaceId: string) {
	nearbyPlaces.value = nearbyPlaces.value.filter(
		place => place.googlePlaceId !== googlePlaceId,
	)
}

async function onSavePlaces() {
	if (nearbyPlaces.value.length) {
		const placesWithReviews = nearbyPlaces.value.filter(
			place => place.rating !== null,
		)
		await Promise.all(
			placesWithReviews.map(place =>
				$fetch(adminPlaceApiRoute.path, {
					method: 'POST',
					body: place,
				}),
			),
		)

		nearbyPlaces.value = []
	}
}
</script>

<template>
	<div class="max-w-screen-md mx-auto">
		<div class="flex flex-col gap-3 w-full mb-8">
			<div class="flex flex-col w-full gap-3">
				<div class="flex w-full gap-3 items-end">
					<div class="input-group w-full">
						<label class="label" for="latitude">Latitude</label>

						<input
							id="latitude"
							v-model="latitude"
							name="latitude"
							type="text"
							class="input input-bordered w-full"
						>
					</div>

					<div class="input-group w-full">
						<label class="label" for="longitude">Longitude</label>

						<input
							id="longitude"
							v-model="longitude"
							name="longitude"
							type="text"
							class="input input-bordered w-full"
						>
					</div>

					<button class="btn btn-neutral" @click="onCenterLocation">
						Center
					</button>

					<button class="btn btn-neutral" @click="onFindPlacesNearby">
						Find Places Nearby
					</button>
				</div>

				<GoogleMap
					v-if="latitude && longitude"
					v-model:latitude="latitude"
					v-model:longitude="longitude"
				/>
			</div>

			<div class="flex w-full gap-3 items-end">
				<div class="input-group w-full">
					<label class="label" for="text-query">Text Query</label>

					<input
						id="text-query"
						v-model="textQuery"
						name="text-query"
						type="text"
						class="input input-bordered w-full"
					>
				</div>

				<button class="btn btn-neutral" @click="onSearchByText">
					Search
				</button>
			</div>

			<button class="btn btn-neutral" @click="onSavePlaces">
				Save Places
			</button>
		</div>

		<div class="flex flex-col gap-3">
			<div
				v-for="place in nearbyPlaces"
				:key="place.googlePlaceId"
				class="flex p-4 gap-8 shadow-lg border rounded-xl w-full max-"
			>
				<div class="w-full flex flex-col gap-3">
					<p>
						{{ place.displayName }}
					</p>

					<GoogleRating
						:id="`rating-${place.googlePlaceId}`"
						:score="place.rating"
						:count="place.userRatingCount"
					/>

					<PriceRating
						v-if="place.price"
						:id="`price-${place.googlePlaceId}`"
						:price="place.price"
					/>

					<NuxtLink target="_blank" :to="place.website">
						{{ place.website }}
					</NuxtLink>

					<p>{{ place.city }}, {{ place.country }}</p>
				</div>

				<button
					type="button"
					class="btn btn-square btn-error"
					@click="() => onPlaceRemove(place.googlePlaceId)"
				>
					<IconTrash class="text-white w-6" :font-controlled="false" />
				</button>
			</div>
		</div>
	</div>
</template>
