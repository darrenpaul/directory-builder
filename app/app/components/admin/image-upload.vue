<script setup lang="ts">
import { StorageBucket } from '~~/constants/storage-bucket'
import {
	ERROR,
	useToaster,
} from '~~/modules/toast-notification-module/runtime'

const props = defineProps({
	slug: { type: String, required: true },
	id: { type: String, required: true },
})

const emit = defineEmits(['updated'])

const supabase = useSupabaseClient()
const { createNotification } = useToaster()

const uploading = ref(false)
const files = ref()

function generateRandomString(length: number = 5) {
	return Math.random()
		.toString(36)
		.substring(2, length + 2)
}

function createFilePath({ fileExtension }: { fileExtension: string }) {
	return `${props.id}/${props.slug}-${generateRandomString()}.${fileExtension}`
}

function getImageUrl(imageUrl: string, options: object) {
	const { data } = supabase.storage
		.from(StorageBucket.BLOG)
		.getPublicUrl(imageUrl, {
			transform: {
				...options,
			},
		})

	return data.publicUrl
}

async function uploadImage(evt) {
	files.value = evt.target.files
	try {
		uploading.value = true

		if (!files.value || files.value.length === 0) {
			throw new Error('You must select an image to upload.')
		}

		const file = files.value[0]
		const fileExtension = file.name.split('.').pop()

		const filePath = createFilePath({ fileExtension })

		const { data, error } = await supabase.storage
			.from(StorageBucket.BLOG)
			.upload(filePath, file)

		if (error) {
			createNotification({
				title: '',
				message: error.message,
				type: ERROR,
			})

			return
		}

		const displayImageUrl = getImageUrl(data?.path, {
			quality: 50,
		})

		emit('updated', displayImageUrl)
	}
	catch (error) {
		createNotification({
			title: '',
			message: error,
			type: ERROR,
		})
	}
	finally {
		uploading.value = false
	}
}
</script>

<template>
	<div>
		<div class="grid grid-cols-2 mb-3">
			<div>
				<label class="label mb-0 pb-0 pl-0"> Image from Upload </label>

				<p class="text-neutral-400 text-sm">
					Max image size: 15MB
				</p>
			</div>

			<div class="justify-self-end">
				<label class="btn btn-neutral" for="single">
					{{ uploading ? "Uploading ..." : "Upload" }}
				</label>
				<input
					id="single"
					style="position: absolute; visibility: hidden"
					type="file"
					accept="image/*"
					:disabled="uploading"
					@change="uploadImage"
				>
			</div>
		</div>

		<!-- <ProductImageList v-model="images" @update-seo-image="setSeoMetaImage" /> -->
	</div>
</template>
