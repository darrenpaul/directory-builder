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

	router.push({
		query: queryParams,
	})
}
</script>

<template>
	<div
		id="search-form"
		class="flex flex-col lg:flex-row gap-4 items-end w-full mb-8"
	>
		<SearchInput
			id="business-name"
			v-model="queryBusinessName"
			placeholder="Cool Coffees"
		/>

		<SearchInput
			id="postal-code"
			v-model="queryPostalCode"
			placeholder="8001"
		/>

		<button
			type="button"
			class="btn w-full lg:w-fit btn-lg btn-neutral"
			@click="onSearch"
		>
			Search
		</button>
	</div>
</template>
