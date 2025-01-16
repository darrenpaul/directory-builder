<script setup lang="ts">
import { useDebounceFn } from '@vueuse/core'
import { ref } from 'vue'
import { ratingApiRoute } from '~~/constants/routes-api'
import generateNumberArray from '~~/lib/generate-number-array'

const props = defineProps({
	placeId: { type: String, required: true },
})

const rating = ref(5)

const ratings = generateNumberArray({ start: 1, end: 5 })

const debouncedFn = useDebounceFn(
	async () => {
		await $fetch(ratingApiRoute.path, {
			method: 'POST',
			body: {
				placeId: props.placeId,
				rating: rating.value,
			},
		})
	},
	1000,
	{ maxWait: 5000 },
)

function clickedFn() {
	debouncedFn()
}

useEventListener(window, 'resize', debouncedFn)
</script>

<template>
	<div class="rating rating-lg">
		<input
			v-for="ratingIndex in ratings"
			:key="ratingIndex"
			ratings
			type="radio"
			name="rating-1"
			class="mask mask-star-2 bg-orange-400"
			:checked="rating === ratingIndex"
			@change="() => (rating = ratingIndex)"
			@click="clickedFn"
		>
	</div>
</template>
