<script setup lang="ts">
const props = defineProps({
	id: { type: String, required: true },
	score: { type: Number, required: true },
	count: { type: Number, required: true },
})

const maxRating = 4
const ratings = generateNumberArray(0, maxRating)
const scoreRounded = computed(() => Math.floor(props.score))

function generateNumberArray(start: number, end: number): number[] {
	return Array.from({ length: end - start + 1 }, (_, i) => start + i)
}
</script>

<template>
	<div class="flex flex-col gap-1">
		<div class="rating rating-md">
			<input
				v-for="rating in ratings"
				:key="`${props.id}-${rating}`"
				type="radio"
				:name="props.id"
				class="mask mask-star-2 bg-orange-400"
				:checked="rating < scoreRounded"
			>
		</div>

		<p>{{ props.count }} reviews</p>
	</div>
</template>
