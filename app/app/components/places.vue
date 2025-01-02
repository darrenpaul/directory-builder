<script setup lang="ts">
import { useGeolocation } from '@vueuse/core'
import { placeApiRoute } from '~~/constants/routes-api'
import { parseGooglePlace } from '~/lib/google-place'

const { coords } = useGeolocation()

const latLng = ref<string | null>()

async function onFindPlacesNearby() {
	if (!latLng.value) {
		return
	}

	const { Place }
    = (await google.maps.importLibrary('places')) as google.maps.PlacesLibrary

	const [lat, lng] = latLng.value.split(',')

	if (!lat || !lng) {
		return
	}

	const center = new google.maps.LatLng(
		Number.parseFloat(lat),
		Number.parseFloat(lng),
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
			'websiteURI',
		],
		locationRestriction: {
			center,
			radius: 500,
		},
		includedPrimaryTypes: ['cafe'],
		maxResultCount: 10,
		language: 'en',
		region: 'za',
	}

	const { places } = await Place.searchNearby(request)
	if (places.length) {
		const parsedPlaces = places.map(parseGooglePlace)

		console.log(parsedPlaces)

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
		latLng.value = `${coords.value.latitude},${coords.value.longitude}`
	}
})
</script>

<template>
	<div>
		<div class="flex gap-3 items-end">
			<div class="input-group">
				<label class="label" for="lat-lng">Latitude, Longitude</label>

				<input
					id="lat-lng"
					v-model="latLng"
					name="lat-lng"
					type="text"
					class="input input-bordered w-full"
				>
			</div>

			<button class="btn btn-neutral" @click="onFindPlacesNearby">
				Find Places Nearby
			</button>
		</div>
	</div>
</template>
