<script setup lang="ts">
import ZodSchemaBuilder from '~~/lib/zod-schema-builder'
import { useToaster } from '~~/modules/toast-notification-module/runtime'

const state = reactive<{ [key: string]: string | undefined }>({
	currentPassword: undefined,
	newPassword: undefined,
})

const supabase = useSupabaseClient()
const { createNotification } = useToaster()
const user = useSupabaseUser()

const zodSchema = new ZodSchemaBuilder().withPassword().build()

const canSubmit = computed(() => {
	const currentPasswordValid = zodSchema.safeParse({
		password: state.currentPassword,
	}).success

	const newPasswordValid = zodSchema.safeParse({
		password: state.newPassword,
	}).success

	return currentPasswordValid && newPasswordValid
})

async function onSubmit(event: Event) {
	event.preventDefault()

	const { error: signInError } = await supabase.auth.signInWithPassword({
		email: user.value.email,
		password: state.currentPassword,
	})

	if (signInError) {
		createNotification({
			title: '',
			message: signInError.message,
			type: ERROR,
		})

		return
	}

	const { error } = await supabase.auth.updateUser({
		password: state.newPassword,
	})

	if (error) {
		createNotification({
			title: '',
			message: error.message,
			type: ERROR,
		})

		return
	}

	createNotification({
		title: '',
		message: 'Password changed successfully',
		type: SUCCESS,
	})

	state.currentPassword = undefined
	state.newPassword = undefined
}
</script>

<template>
	<form class="w-full max-w-lg px-3 mx-auto mt-16" @submit="onSubmit">
		<label class="form-control w-full mb-3">
			<span class="label label-text text-neutral"> Current Password </span>

			<input
				id="current-password"
				v-model.trim="state.currentPassword"
				name="password"
				type="password"
				placeholder="Enter your current password"
				class="input input-bordered border-2 w-full border-neutral"
			>
		</label>

		<label class="form-control w-full mb-3">
			<span class="label label-text text-neutral"> New Password </span>

			<input
				id="new-password"
				v-model.trim="state.newPassword"
				name="password"
				type="password"
				placeholder="Enter your new password"
				class="input input-bordered border-2 w-full border-neutral"
			>
		</label>

		<button class="btn btn-neutral w-full mb-3" :disabled="!canSubmit">
			Change Password
		</button>
	</form>
</template>
