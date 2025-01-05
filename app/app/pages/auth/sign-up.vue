<script setup lang="ts">
import SignUpForm from '~/components/auth/sign-up-form.vue'

definePageMeta({
	layout: 'auth-layout',
})
</script>

<template>
	<div class="min-h-screen">
		<div class="h-screen flex flex-col items-center justify-center">
			<h1 class="text-4xl font-bold">
				Welcome!
			</h1>

			<h2 class="text-xl">
				Sign up to for a new account
			</h2>

			<SignUpForm />
		</div>
	</div>
</template>
