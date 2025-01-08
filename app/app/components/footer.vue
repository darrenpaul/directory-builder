<script setup lang="ts">
import isEmail from 'validator/lib/isEmail'
import { newsletterApiRoute } from '~~/constants/routes-api'
import {
	ERROR,
	useToaster,
} from '~~/modules/toast-notification-module/runtime'

const { createNotification } = useToaster()
const emailAddress = ref<string | undefined>(undefined)

async function onNewsletterSubmit() {
	if (!emailAddress.value) {
		createNotification({
			title: '',
			message: 'Email address is required',
			type: ERROR,
		})

		return
	}

	if (!isEmail(emailAddress.value)) {
		createNotification({
			title: '',
			message: 'Invalid email address',
			type: ERROR,
		})

		return
	}

	try {
		await $fetch(newsletterApiRoute.path, {
			method: 'POST',
			body: {
				emailAddress: emailAddress.value,
			},
		})

		createNotification({
			title: '',
			message: 'Successfully subscribed',
			type: 'SUCCESS',
		})
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
	<footer class="footer bg-base-200 text-base-content p-10">
		<nav>
			<p class="footer-title">
				Services
			</p>
			<!-- <a class="link link-hover">Branding</a>
			<a class="link link-hover">Design</a>
			<a class="link link-hover">Marketing</a>
			<a class="link link-hover">Advertisement</a> -->
		</nav>
		<nav>
			<p class="footer-title">
				Company
			</p>
			<!-- <a class="link link-hover">About us</a>
			<a class="link link-hover">Contact</a>
			<a class="link link-hover">Jobs</a>
			<a class="link link-hover">Press kit</a> -->
		</nav>
		<nav>
			<p class="footer-title">
				Legal
			</p>
			<!-- <a class="link link-hover">Terms of use</a>
			<a class="link link-hover">Privacy policy</a>
			<a class="link link-hover">Cookie policy</a> -->
		</nav>
		<form>
			<p class="footer-title">
				Newsletter
			</p>
			<fieldset class="form-control w-80">
				<label class="label">
					<span class="label-text">Enter your email address</span>
				</label>
				<div class="join">
					<input
						v-model="emailAddress"
						name="email"
						type="email"
						placeholder="john@example.com"
						class="input input-bordered join-item"
					>
					<button
						class="btn btn-neutral join-item"
						type="button"
						@click="onNewsletterSubmit"
					>
						Subscribe
					</button>
				</div>
			</fieldset>
		</form>
	</footer>
</template>
