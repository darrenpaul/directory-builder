<script setup lang="ts">
import type { SearchByLink } from '~~/types/search-by-link'
import SearchByListItem from '~/components/search-by/search-by-list-item'

const props = defineProps({
	id: { type: String, required: true },
	searchByLinks: { type: Array as PropType<SearchByLink[]>, required: true },
	label: { type: String },
})
</script>

<template>
	<div :key="props.id">
		<p class="text-2xl mb-3">
			{{ props.label }}
		</p>

		<div class="grid grid-cols-3">
			<SearchByListItem
				v-for="searchByLink in props.searchByLinks"
				:key="`${props.id}-${searchByLink.id}`"
				:url="searchByLink.url"
				:label="searchByLink.label"
			/>
		</div>
	</div>
</template>
