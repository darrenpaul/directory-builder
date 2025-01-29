<script setup lang="ts">
import isEmail from 'validator/lib/isEmail'
import IconBrand from '~~/assets/icons/brand.svg'
import { directoryRoutes } from '~~/constants/directories'
import { newsletterApiRoute } from '~~/constants/routes-api'
import {
	ERROR,
	useToaster,
} from '~~/modules/toast-notification-module/runtime'
import { contactRoute, termsAndConditionsRoute } from '~/constants/routes'

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

		emailAddress.value = undefined
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
		<aside>
			<IconBrand class="w-16 h-16" filled :font-controlled="false" />

			<p>
				{{ $t("brand") }}
				<br>
				Your local guide to the city's vibrant café culture.
			</p>
		</aside>
		<nav>
			<p class="text-neutral-950 font-semibold">
				Local Directories
			</p>

			<NuxtLink
				v-for="directory in directoryRoutes"
				:key="directory.name"
				:to="directory.path"
				target="_blank"
			>
				{{ directory.label }}
			</NuxtLink>
		</nav>
		<nav>
			<p class="text-neutral-950 font-semibold">
				Company
			</p>

			<NuxtLink :to="contactRoute.path">
				{{ contactRoute.label }}
			</NuxtLink>
		</nav>

		<nav>
			<p class="text-neutral-950 font-semibold">
				Legal
			</p>

			<NuxtLink :to="termsAndConditionsRoute.path">
				{{ termsAndConditionsRoute.label }}
			</NuxtLink>
		</nav>

		<form>
			<p class="text-neutral-950 font-semibold">
				Newsletter
			</p>

			<fieldset class="form-control w-80">
				<label class="label p-0 px-1 pb-1">
					<span class="label-text">Email Address</span>
				</label>

				<div class="join">
					<input
						v-model="emailAddress"
						name="email"
						type="email"
						placeholder="Enter your email address"
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
