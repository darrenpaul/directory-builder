<script setup lang="ts">
import { ref } from 'vue'

const latitude = defineModel<number>('latitude')
const longitude = defineModel<number>('longitude')
const markers = defineModel<string[]>('markers')

const {
	public: { googleMapsApiKey },
} = useRuntimeConfig()

const isLoaded = ref(false)
const center = ref()
const maps = ref()
const query = ref({
	lat: latitude.value,
	lng: longitude.value,
})

function handleReady({ map }) {
	center.value = map.value.getCenter()

	map.value.addListener('center_changed', () => {
		center.value = map.value.getCenter()

		const _center = center.value || query.value
		const _lat
      = typeof _center.lat === 'function' ? _center.lat() : _center.lat
		const _lng
      = typeof _center.lng === 'function' ? _center.lng() : _center.lng

		latitude.value = _lat
		longitude.value = _lng
	})

	isLoaded.value = true
}
</script>

<template>
	<div class="not-prose">
		<ScriptGoogleMaps
			ref="maps"
			:center="query"
			:markers="markers"
			:api-key="googleMapsApiKey"
			:map-options="{
				gestureHandling: 'none',
				zoom: 19,
				clickableIcons: false,
				streetViewControl: false,
			}"
			@ready="handleReady"
		/>
	</div>
</template>
