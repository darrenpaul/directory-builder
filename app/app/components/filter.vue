<script setup lang="ts">
import SearchInput from '~/components/search-input.vue'
import useFilters from '~/composables/use-filters'

const route = useRoute()
const router = useRouter()

const { attributeOptions } = useFilters()

const queryBusinessName = ref<string | undefined>(
	(route.query.businessName as string) || undefined,
)

const queryPostalCode = ref<string | undefined>(
	(route.query.postalCode as string) || undefined,
)

function onAttributeOptionChange(key: string) {
	const currentUrlQueries = {
		...(route.query as Record<string, string | null>),
	}

	if (Object.keys(currentUrlQueries).includes(key)) {
		currentUrlQueries[key] = null
	}
	else {
		currentUrlQueries[key] = 'true'
	}

	onSearch(currentUrlQueries)
}

function updateQueryParams(
	newQueryParams: Record<string, string | null | undefined>,
) {
	const urlQueries: Record<string, string> = {
		...(route.query as Record<string, string>),
	}

	Object.entries(newQueryParams).forEach(([key, value]) => {
		if (value === null || value === undefined || value === '') {
			delete urlQueries[key]
		}
		else {
			urlQueries[key] = value.toString()
		}
	})

	return urlQueries
}

async function onSearch(
	newUrlQueries: Record<string, string | null | undefined>,
) {
	const updatedUrlQueries = updateQueryParams({
		...newUrlQueries,
		businessName: queryBusinessName.value,
		postalCode: queryPostalCode.value,
	})

	router.push({
		query: updatedUrlQueries,
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
				@keydown.enter="
					() => onSearch(route.query as Record<string, string | null>)
				"
			/>

			<SearchInput
				id="postal-code"
				v-model="queryPostalCode"
				placeholder="Enter a postal code"
				@keydown.enter="
					() => onSearch(route.query as Record<string, string | null>)
				"
			/>

			<button
				type="button"
				class="btn w-full lg:w-fit btn-lg btn-neutral"
				@click="() => onSearch(route.query as Record<string, string | null>)"
			>
				Search
			</button>
		</div>

		<div class="w-fit flex flex-wrap gap-2">
			<label
				v-for="attributeOption in attributeOptions"
				:key="attributeOption.key"
				class="label cursor-pointer"
			>
				<span class="label-text mr-2">{{ attributeOption.label }}</span>
				<input
					type="checkbox"
					:checked="!!route.query[attributeOption.key]"
					class="checkbox"
					@change="() => onAttributeOptionChange(attributeOption.key)"
				>
			</label>
		</div>
	</div>
</template>
