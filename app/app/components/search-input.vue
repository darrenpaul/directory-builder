<script setup lang="ts">
const props = defineProps({
	id: { type: String, required: true },
	placeholder: { type: String },
})

const value = defineModel<string>()
</script>

<template>
	<div class="input-group w-full">
		<input
			:id="props.id"
			v-model="value"
			type="text"
			:placeholder="props.placeholder"
			class="input input-bordered input-lg w-full"
		>
	</div>
</template>
