<script setup lang="ts">
import IconMoney from '~~/assets/icons/money.svg'

const props = defineProps({
	id: { type: String, required: true },
	price: { type: String, required: true },
})

enum priceRating {
	FREE = 0,
	INEXPENSIVE = 1,
	MODERATE = 2,
	EXPENSIVE = 3,
	VERY_EXPENSIVE = 4,
}

const ratings = generateNumberArray(0, priceRating[`${props.price}`] || 0)

function generateNumberArray(start: number, end: number): number[] {
	return Array.from({ length: end - start + 1 }, (_, i) => start + i)
}
</script>

<template>
	<div class="rating rating-md gap-1">
		<IconMoney
			v-for="rating in ratings"
			:key="`${props.id}-${rating}`"
			class="w-6"
			:font-controlled="false"
		/>
	</div>
</template>
