<script setup lang="ts">
import { homeRoute } from '~/constants/routes'

const props = defineProps({
	crumbs: {
		type: Array as PropType<{ id: string, url: string, label: string }[]>,
		required: true,
	},
})
</script>

<template>
	<div class="breadcrumbs text-sm mb-4">
		<ul>
			<li>
				<NuxtLink :to="homeRoute.path">
					{{ homeRoute.label }}
				</NuxtLink>
			</li>

			<li v-for="crumb in props.crumbs" :key="crumb.id">
				<NuxtLink :to="crumb.url">
					{{ crumb.label }}
				</NuxtLink>
			</li>
		</ul>
	</div>
</template>
