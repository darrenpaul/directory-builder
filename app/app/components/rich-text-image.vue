<script setup lang="ts">
import { placeRequestApiRoute } from '~~/constants/routes-api'
import {
	ERROR,
	SUCCESS,
	useToaster,
} from '~~/modules/toast-notification-module/runtime'

const props = defineProps({
	id: { type: String, required: true },
	slug: { type: String, required: true },
})

const emit = defineEmits(['updated'])

const { createNotification } = useToaster()

const modal = ref<HTMLDialogElement>()
const loading = ref(false)
const images = ref([])
const imageUrl = ref<string | undefined>(undefined)

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
	imageUrl.value = undefined

	if (modal.value) {
		modal.value.close()
	}
}

async function onCreatePlaceRequest() {
	if (!imageUrl.value) {
		createNotification({
			title: '',
			message: 'Missing required fields',
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
				imageUrl: imageUrl.value,
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

function onImageUpdated(value: string) {
	emit('updated', value)

	closeModal()
}
</script>

<template>
	<div>
		<button type="button" class="btn btn-neutral" @click="openModal">
			Image
		</button>

		<dialog id="product-variant-modal" ref="modal" class="modal">
			<div class="modal-box">
				<p class="text-2xl font-bold">
					Add Image
				</p>

				<div class="input-group mb-4">
					<label class="label" for="image-url">Image from URI</label>

					<input
						id="image-url"
						v-model="imageUrl"
						name="image-url"
						type="text"
						placeholder="Enter the url of the image"
						class="input input-bordered w-full"
					>
				</div>

				<AdminImageUpload
					:id="props.id"
					v-model="images"
					:slug="props.slug"
					@updated="onImageUpdated"
				/>

				<div class="input-group mb-4">
					<label class="label" for="image-url">Image from Upload</label>

					<button
						:disabled="loading"
						class="btn btn-neutral btn-outline btn-block"
						@click="onCreatePlaceRequest"
					>
						Upload
					</button>
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
