<script setup lang="ts">
const props = defineProps({
	url: { type: String, required: true },
	label: { type: String, required: true },
})
</script>

<template>
	<NuxtLink class="link" :to="props.url">
		{{ props.label }}
	</NuxtLink>
</template>
