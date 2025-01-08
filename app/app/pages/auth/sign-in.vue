<script setup lang="ts">
import SignInForm from '~/components/auth/sign-in-form.vue'
</script>

<template>
	<div class="min-h-screen">
		<div class="h-screen flex flex-col items-center justify-center">
			<h1 class="text-4xl font-bold">
				Sign In Here
			</h1>

			<h2 class="text-xl">
				Sign in to continue
			</h2>

			<SignInForm />
		</div>
	</div>
</template>
