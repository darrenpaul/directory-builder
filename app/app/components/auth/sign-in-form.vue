<script setup lang="ts">
import {
	ERROR,
	SUCCESS,
	useToaster,
} from '~~/modules/toast-notification-module/runtime'
import useAuthFormValid from '~/composables/auth-form-valid'
import { adminRoute, signUpRoute } from '~/constants/routes'

const email = ref<string | null | undefined>()
const password = ref<string | null | undefined>()

const supabase = useSupabaseClient()
const router = useRouter()
const { createNotification } = useToaster()
const { emailValid, passwordValid, canSubmitSignIn, clearFields }
  = useAuthFormValid({ email, password })

async function onSubmit(event: Event) {
	event.preventDefault()

	if (!canSubmitSignIn.value) {
		return null
	}

	const { error } = await supabase.auth.signInWithPassword({
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

	createNotification({
		title: '',
		message: 'Sign in successful',
		type: SUCCESS,
	})

	clearFields()

	await router.push(adminRoute.path)
}
</script>

<template>
	<form class="w-full max-w-lg px-3" @submit="onSubmit">
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
				placeholder="john@company.com"
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
				placeholder="R@nd0mP@55wOrd"
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
		</div>

		<button class="btn btn-neutral w-full mb-3" :disabled="!canSubmitSignIn">
			Sign In
		</button>

		<p>
			Don't have an account?
			<NuxtLink class="link link-primary" :to="signUpRoute.path">
				Sign Up
			</NuxtLink>
		</p>
	</form>
</template>
