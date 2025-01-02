<script setup lang="ts">
import { useGeolocation } from '@vueuse/core'
import { placeApiRoute } from '~~/constants/routes-api'
import { parseGooglePlace } from '~/lib/google-place'

const { coords } = useGeolocation()

const lat = ref<number | null>()
const lng = ref<number | null>()

async function onFindPlacesNearby() {
	console.log('find places nearby')
	if (!lat.value || !lng.value) {
		return
	}

	const { Place, SearchNearbyRankPreference }
    = (await google.maps.importLibrary('places')) as google.maps.PlacesLibrary

	const center = new google.maps.LatLng(
		lat.value,
		lng.value,
	)

	const request = {
		fields: [
			'id',
			'displayName',
			'location',
			'businessStatus',
			'photos',
			'addressComponents',
			'servesCoffee',
			'priceLevel',
			'hasDineIn',
			'allowsDogs',
			'rating',
			'userRatingCount',
			'paymentOptions',
			'regularOpeningHours',
			'formattedAddress',
			'hasRestroom',
			'hasDelivery',
			'hasTakeout',
		],
		locationRestriction: {
			center,
			radius: 1000,
		},
		includedPrimaryTypes: ['cafe'],
		maxResultCount: 5,
		rankPreference: SearchNearbyRankPreference.POPULARITY,
		language: 'en',
		region: 'za',
	}

	const { places } = await Place.searchNearby(request)

	if (places.length) {
		const parsedPlaces = places.map(parseGooglePlace)

		await Promise.all(
			parsedPlaces.map(place =>
				$fetch(placeApiRoute.path, {
					method: 'POST',
					body: place,
				}),
			),
		)
	}
}

watch(coords, () => {
	if (coords.value) {
		lat.value = coords.value.latitude
		lng.value = coords.value.longitude
	}
})
</script>

<template>
	<div>
		<div class="flex gap-3 items-end">
			<div class="input-group">
				<label class="label" for="lat">Latitude</label>

				<input
					id="lat"
					v-model="lat"
					name="lat"
					type="text"
					class="input input-bordered w-full"
				>
			</div>

			<div class="input-group">
				<label class="label" for="lng">Longitude</label>

				<input
					id="lng"
					v-model="lng"
					name="lng"
					type="text"
					class="input input-bordered w-full"
				>
			</div>

			<button class="btn btn-primary" @click="onFindPlacesNearby">
				Find Places Nearby
			</button>
		</div>
	</div>
</template>
