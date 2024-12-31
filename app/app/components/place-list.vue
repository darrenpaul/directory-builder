<script setup lang="ts">
import type { Place } from '~~/types/place'
import PlaceListItem from '~/components/place-list-item.vue'

const props = defineProps({
	places: { type: Array as PropType<Place[]>, required: true },
})
</script>

<template>
	<div class="grid grid-cols-2 gap-6">
		<PlaceListItem
			v-for="place in props.places"
			:key="place.id"
			:place="place"
		/>
	</div>
</template>
