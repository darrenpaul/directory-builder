<script setup lang="ts">
import { adminPlaceAttributeApiRoute } from '~~/constants/routes-api'
import { useToaster } from '~~/modules/toast-notification-module/runtime'

const { createNotification } = useToaster()

const loading = ref(false)
const state = reactive<{ [key: string]: string | boolean | undefined }>({
	placeId: undefined,
	attributeLabel: undefined,
	attributeKey: undefined,
	attributeValue: undefined,
})

async function onSubmit() {
	loading.value = true

	try {
		await $fetch(adminPlaceAttributeApiRoute.path, {
			method: 'POST',
			body: {
				placeId: state.placeId,
				label: state.attributeLabel,
				key: state.attributeKey,
				value: state.attributeValue,
			},
		})

		createNotification({
			title: '',
			message: 'Attribute created successfully',
			type: 'SUCCESS',
		})

		state.placeId = undefined
		state.attributeLabel = undefined
		state.attributeKey = undefined
		state.attributeValue = undefined
	}
	catch (error) {
		createNotification({
			title: '',
			message: error,
			type: 'ERROR',
		})
	}
	finally {
		loading.value = false
	}
}
</script>

<template>
	<div>
		<div class="input-group w-full">
			<label class="label" for="place-id">Place Id</label>

			<input
				id="place-id"
				v-model="state.placeId"
				name="place-id"
				type="text"
				class="input input-bordered w-full"
			>
		</div>

		<div class="input-group w-full">
			<label class="label" for="attribute-label">Attribute Label</label>

			<input
				id="attribute-label"
				v-model="state.attributeLabel"
				name="attribute-label"
				type="text"
				class="input input-bordered w-full"
			>
		</div>

		<div class="input-group w-full">
			<label class="label" for="attribute-key">Attribute Key</label>

			<input
				id="attribute-key"
				v-model="state.attributeKey"
				name="attribute-key"
				type="text"
				class="input input-bordered w-full"
			>
		</div>

		<div class="input-group w-full">
			<label class="label" for="attribute-value">Attribute Value</label>
			<input
				id="attribute-value"
				v-model="state.attributeValue"
				name="attribute-value"
				type="checkbox"
				class="checkbox checkbox-lg"
			>
		</div>

		<button
			class="btn btn-neutral btn-block"
			:disable="loading"
			@click="onSubmit"
		>
			Create Place Attribute
		</button>
	</div>
</template>
