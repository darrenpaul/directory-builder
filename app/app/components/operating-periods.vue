<script setup lang="ts">
import type { OperatingPeriod } from '~~/types/operating-period'

const props = defineProps({
	operatingPeriods: {
		type: Array as PropType<OperatingPeriod[]>,
		required: true,
	},
})
</script>

<template>
	<div class="w-fit">
		<p class="text-2xl">
			Operating Periods
		</p>

		<ul>
			<li
				v-for="operatingPeriod in props.operatingPeriods"
				:key="operatingPeriod.id"
				class="py-3 grid grid-cols-2"
			>
				<p>{{ operatingPeriod.day }}</p>
				<p>{{ operatingPeriod.opensAt }} - {{ operatingPeriod.closesAt }}</p>
			</li>
		</ul>
	</div>
</template>
O
