<script setup lang="ts">
import isEmail from 'validator/lib/isEmail'
import { placeRequestApiRoute } from '~~/constants/routes-api'
import {
	ERROR,
	SUCCESS,
	useToaster,
} from '~~/modules/toast-notification-module/runtime'

const emit = defineEmits(['updated'])

const { createNotification } = useToaster()

const modal = ref<HTMLDialogElement>()
const loading = ref(false)
const companyName = ref<string | undefined>(undefined)
const country = ref<string | undefined>(undefined)
const city = ref<string | undefined>(undefined)
const emailAddress = ref<string | undefined>(undefined)

function preventEscClose(event: Event) {
	if (event.key === 'Escape' && modal.value?.open) {
		event.preventDefault()
	}
}

onMounted(() => {
	window.addEventListener('keydown', preventEscClose)
})

onUnmounted(() => {
	window.removeEventListener('keydown', preventEscClose)
})

function openModal() {
	if (modal.value) {
		modal.value.showModal()
	}
}

function closeModal() {
	loading.value = false
	companyName.value = undefined
	country.value = undefined
	city.value = undefined
	emailAddress.value = undefined

	if (modal.value) {
		modal.value.close()
	}
}

async function onCreatePlaceRequest() {
	if (
		!companyName.value
		|| !country.value
		|| !city.value
		|| !emailAddress.value
	) {
		createNotification({
			title: '',
			message: 'Missing required fields',
			type: ERROR,
		})

		loading.value = true

		return
	}

	if (!isEmail(emailAddress.value)) {
		createNotification({
			title: '',
			message: 'Invalid email address',
			type: ERROR,
		})

		loading.value = true
		return
	}

	loading.value = true

	try {
		await $fetch(placeRequestApiRoute.path, {
			method: 'POST',
			body: {
				companyName: companyName.value,
				country: country.value,
				city: city.value,
				userEmailAddress: emailAddress.value,
			},
		})

		createNotification({
			title: '',
			message: t('submitPlace.toastSuccess'),
			type: SUCCESS,
		})

		emit('updated')

		closeModal()
	}
	catch (error) {
		createNotification({
			title: '',
			message: error as string,
			type: ERROR,
		})

		loading.value = false
	}
}
</script>

<template>
	<div>
		<button class="btn btn-neutral" @click="openModal">
			{{ $t("submitPlace.button") }}
		</button>

		<dialog id="product-variant-modal" ref="modal" class="modal">
			<div class="modal-box">
				<p class="text-2xl font-bold">
					{{ $t("submitPlace.title") }}
				</p>

				<div class="input-group">
					<label class="label" for="comapny-name">Name</label>

					<input
						id="comapny-name"
						v-model="companyName"
						name="comapny-name"
						type="text"
						placeholder="Enter the name of the place"
						class="input input-bordered w-full"
					>
				</div>

				<div class="input-group">
					<label class="label" for="country">Country</label>

					<input
						id="country"
						v-model="country"
						name="country"
						type="text"
						placeholder="Which country is it located in?"
						class="input input-bordered w-full"
					>
				</div>

				<div class="input-group">
					<label class="label" for="city">City</label>

					<input
						id="city"
						v-model="city"
						name="city"
						type="text"
						placeholder="Which city is it located in?"
						class="input input-bordered w-full"
					>
				</div>

				<div class="input-group">
					<label class="label" for="email-address">Email Address</label>

					<input
						id="email-address"
						v-model="emailAddress"
						name="email-address"
						type="email"
						placeholder="Enter your email address"
						class="input input-bordered w-full"
					>
				</div>

				<div class="modal-action">
					<div class="grid grid-cols-2 w-full gap-3">
						<button :disabled="loading" class="btn" @click="closeModal">
							Cancel
						</button>

						<button
							:disabled="loading"
							class="btn btn-neutral"
							@click="onCreatePlaceRequest"
						>
							Save
						</button>
					</div>
				</div>
			</div>
		</dialog>
	</div>
</template>
