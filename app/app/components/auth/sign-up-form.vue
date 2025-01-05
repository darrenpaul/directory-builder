<script setup lang="ts">
import { DatabaseTable } from '~~/constants/database-table'
import {
	ERROR,
	SUCCESS,
	useToaster,
} from '~~/modules/toast-notification-module/runtime'
import useAuthFormValid from '~/composables/auth-form-valid'
import { adminRoute, signInRoute } from '~/constants/routes'

const firstName = ref<string | null | undefined>()
const lastName = ref<string | null | undefined>()
const email = ref<string | null | undefined>()
const password = ref<string | null | undefined>()

const supabase = useSupabaseClient()
const router = useRouter()
const { createNotification } = useToaster()
const {
	emailValid,
	passwordValid,
	firstNameValid,
	lastNameValid,
	canSubmitSignUp,
	clearFields,
} = useAuthFormValid({
	email,
	password,
	firstName,
	lastName,
})

async function createUser(userId: string) {
	const { error } = await supabase.from(DatabaseTable.USER).insert({
		id: userId,
		first_name: firstName.value,
		last_name: lastName.value,
		updated_at: new Date(),
		created_at: new Date(),
	})

	return error
}

async function onSubmit(event: Event) {
	event.preventDefault()

	if (!canSubmitSignUp.value) {
		return null
	}

	const { data, error } = await supabase.auth.signUp({
		email: email.value,
		password: password.value,
	})

	if (error) {
		createNotification({
			title: '',
			message: error.message,
			type: ERROR,
		})
		return
	}

	if (!data) {
		createNotification({
			title: '',
			message: 'Failed to sign up',
			type: ERROR,
		})
	}

	const userId = data.user.id

	const createdUserError = await createUser(userId)

	if (createdUserError) {
		createNotification({
			title: '',
			message: 'Failed to create user',
			type: ERROR,
		})
		return
	}

	createNotification({
		title: '',
		message: 'Sign up successful',
		type: SUCCESS,
	})

	clearFields()

	await router.push(adminRoute.path)
}
</script>

<template>
	<form class="w-full max-w-lg px-3" @submit="onSubmit">
		<div class="flex gap-4">
			<label class="form-control w-full">
				<span
					class="label label-text"
					:class="firstNameValid ? 'text-error' : 'text-neutral'"
				>First Name</span>

				<input
					id="first-name"
					v-model.trim="firstName"
					name="first-name"
					type="text"
					placeholder="Enter your first name"
					class="input input-bordered border-2 w-full"
					:class="firstNameValid ? 'input-error' : 'border-neutral'"
				>
			</label>

			<label class="form-control w-full">
				<span
					class="label label-text"
					:class="lastNameValid ? 'text-error' : 'text-neutral'"
				>Last Name</span>

				<input
					id="last-name"
					v-model.trim="lastName"
					name="last-name"
					type="text"
					placeholder="Enter your last name"
					class="input input-bordered border-2 w-full"
					:class="lastNameValid ? 'input-error' : 'border-neutral'"
				>
			</label>
		</div>

		<label class="form-control w-full">
			<span
				class="label label-text"
				:class="emailValid ? 'text-error' : 'text-neutral'"
			>Email Address</span>

			<input
				id="email"
				v-model.trim="email"
				name="email"
				type="email"
				placeholder="Enter your email address"
				class="input input-bordered border-2 w-full"
				:class="emailValid ? 'input-error' : 'border-neutral'"
			>
		</label>

		<label class="form-control w-full mb-3">
			<span
				class="label label-text"
				:class="passwordValid ? 'text-error' : 'text-neutral'"
			>Password</span>

			<input
				id="password"
				v-model.trim="password"
				name="password"
				type="password"
				placeholder="Enter your password"
				class="input input-bordered border-2 w-full"
				:class="passwordValid ? 'input-error' : 'border-neutral'"
			>
		</label>

		<div class="mb-3">
			<p class="text-error">
				{{ emailValid }}
			</p>
			<p class="text-error">
				{{ passwordValid }}
			</p>
			<p class="text-error">
				{{ firstNameValid }}
			</p>
			<p class="text-error">
				{{ lastNameValid }}
			</p>
		</div>

		<button class="btn btn-neutral w-full mb-3" :disabled="!canSubmitSignUp">
			Sign Up
		</button>

		<p>
			Already have an account?
			<NuxtLink class="link link-primary" :to="signInRoute.path">
				Sign In
			</NuxtLink>
		</p>
	</form>
</template>
