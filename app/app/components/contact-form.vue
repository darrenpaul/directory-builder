<script setup lang="ts">
import isEmail from 'validator/lib/isEmail'
import { contactApiRoute } from '~~/constants/routes-api'
import {
	ERROR,
	SUCCESS,
	useToaster,
} from '~~/modules/toast-notification-module/runtime'

const { createNotification } = useToaster()

const name = ref<string | null>()
const userEmailAddress = ref<string | null>()
const message = ref<string | null>()

function clearFields() {
	name.value = null
	userEmailAddress.value = null
	message.value = null
}

const canSendMessage = computed(() => {
	return !(
		!name.value
		|| !userEmailAddress.value
		|| !message.value
		|| !isEmail(userEmailAddress.value)
	)
})

async function onSubmit(event: Event) {
	event.preventDefault()

	if (!canSendMessage.value) {
		return
	}

	try {
		await $fetch(contactApiRoute.path, {
			method: 'POST',
			body: {
				name: name.value,
				userEmailAddress: userEmailAddress.value,
				message: message.value,
			},
		})

		createNotification({
			title: '',
			message: 'Message sent',
			type: SUCCESS,
		})

		clearFields()
	}
	catch (error) {
		createNotification({
			title: '',
			message: error as string,
			type: ERROR,
		})
	}
}
</script>

<template>
	<form @submit="onSubmit">
		<div class="input-group">
			<label class="label" for="name">Name</label>

			<input
				id="name"
				v-model="name"
				name="name"
				type="text"
				placeholder="John"
				class="input input-bordered w-full"
			>
		</div>

		<div class="input-group">
			<label class="label" for="email">Email</label>

			<input
				id="email-address"
				v-model="userEmailAddress"
				name="email-address"
				type="email"
				placeholder="john@example.com"
				class="input input-bordered w-full"
			>
		</div>

		<div class="input-group mb-3 lg:mb-6">
			<label class="label" for="message">Message</label>

			<textarea
				id="message"
				v-model="message"
				name="message"
				type="text"
				placeholder="I would like to..."
				class="textarea textarea-bordered w-full h-32 resize-none"
			/>
		</div>

		<button
			:disabled="!canSendMessage"
			class="btn btn-neutral px-6 mb-3 lg:mb-0 w-full"
		>
			Send
		</button>
	</form>
</template>
