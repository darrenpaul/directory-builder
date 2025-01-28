<script setup lang="ts">
const title = defineModel<string>('title')
const description = defineModel<string>('description')
</script>

<template>
	<div>
		<div class="input-group w-full">
			<div class="flex justify-between items-center">
				<label class="label" for="title">Metadata Title</label>
				<small v-if="title">Characters: {{ title.length }}</small>
			</div>

			<input
				id="title"
				v-model="title"
				name="title"
				type="text"
				class="input input-bordered w-full"
			>
			<small>Title length is between 50 and 60 characters.</small>
		</div>

		<div class="input-group w-full">
			<div class="flex justify-between items-center">
				<label class="label" for="description">Metadata Description</label>
				<small v-if="description">Characters: {{ description.length }}</small>
			</div>

			<textarea
				id="description"
				v-model="description"
				name="description"
				type="text"
				class="textarea textarea-bordered h-24 w-full"
			/>

			<small>Description length is between 110 and 160 characters.</small>
		</div>
	</div>
</template>
