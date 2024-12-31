<script setup lang="ts">
import { placeApiRoute } from '~~/constants/routes-api'
import { parseGooglePlace } from '~/lib/google-place'

async function testPlaces() {
	const { Place, SearchNearbyRankPreference }
    = (await google.maps.importLibrary('places')) as google.maps.PlacesLibrary

	const center = new google.maps.LatLng(
		// coords.value.latitude,
		// coords.value.longitude,
		48.211221,
		16.37257,
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
			radius: 500,
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
</script>

<template>
	<div>
		<button class="btn btn-primary" @click="testPlaces">
			Test Place
		</button>
	</div>
</template>
