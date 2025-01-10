<script setup lang="ts">
import SearchInput from '~/components/search-input.vue'

const route = useRoute()
const router = useRouter()

const queryBusinessName = ref<string | undefined>(
	(route.query.businessName as string) || undefined,
)

const queryPostalCode = ref<string | undefined>(
	(route.query.postalCode as string) || undefined,
)

const queryAllowsDogs = ref<string | undefined>(
	(route.query.allowsDogs as string) || undefined,
)

const queryHasWifi = ref<string | undefined>(
	(route.query.hasWifi as string) || undefined,
)

function setAllowsDogs() {
	queryAllowsDogs.value = route.query.allowsDogs ? '' : 'true'
	onSearch()
}

function setHasWifi() {
	queryHasWifi.value = route.query.hasWifi ? '' : 'true'
	onSearch()
}

async function onSearch() {
	const queryParams = {
		...route.query,
	}

	if (queryBusinessName.value) {
		queryParams.businessName = queryBusinessName.value
	}
	else {
		delete queryParams.businessName
	}

	if (queryPostalCode.value) {
		queryParams.postalCode = queryPostalCode.value
	}
	else {
		delete queryParams.postalCode
	}

	if (queryAllowsDogs.value) {
		queryParams.allowsDogs = queryAllowsDogs.value
	}
	else {
		delete queryParams.allowsDogs
	}

	if (queryHasWifi.value) {
		queryParams.hasWifi = queryHasWifi.value
	}
	else {
		delete queryParams.hasWifi
	}

	router.push({
		query: queryParams,
	})
}
</script>

<template>
	<div
		id="search-form"
		class="flex flex-col mb-8 bg-base-200 rounded-box p-3 shadow-md"
	>
		<div class="flex flex-col lg:flex-row gap-4 items-end w-full mb-3">
			<SearchInput
				id="business-name"
				v-model="queryBusinessName"
				placeholder="Enter a coffee shop name"
				@keydown.enter="onSearch"
			/>

			<SearchInput
				id="postal-code"
				v-model="queryPostalCode"
				placeholder="Enter a postal code"
				@keydown.enter="onSearch"
			/>

			<button
				type="button"
				class="btn w-full lg:w-fit btn-lg btn-neutral"
				@click="onSearch"
			>
				Search
			</button>
		</div>

		<div class="w-fit flex flex-wrap gap-2">
			<label class="label cursor-pointer">
				<span class="label-text mr-2">Allows Dogs</span>
				<input
					type="checkbox"
					:checked="!!route.query.allowsDogs"
					class="checkbox"
					@change="setAllowsDogs"
				>
			</label>

			<label class="label cursor-pointer">
				<span class="label-text mr-2">Has Wifi</span>
				<input
					type="checkbox"
					:checked="!!route.query.hasWifi"
					class="checkbox"
					@change="setHasWifi"
				>
			</label>
		</div>
	</div>
</template>
