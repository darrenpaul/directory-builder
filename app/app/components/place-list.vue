<script setup lang="ts">
import type { Place } from '~~/types/place'
import NoEntriesFoundForm from '~/components/no-entries-found-form.vue'
import PlaceListItem from '~/components/place-list-item.vue'

const props = defineProps({
	places: { type: Array as PropType<Place[]>, required: true },
	label: { type: String, required: false },
})
</script>

<template>
	<div class="border-b border-neutral-200 pb-6">
		<p v-if="props.label" class="text-3xl font-bold mb-3">
			{{ props.label }}
		</p>

		<div v-if="props.places.length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-6">
			<PlaceListItem
				v-for="place in props.places"
				:key="place.id"
				:place="place"
			/>
		</div>
		<NoEntriesFoundForm v-else />
	</div>
</template>
