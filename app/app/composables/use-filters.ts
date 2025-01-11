import type { AttributeOption } from '~~/types/attribute-option'
import { attributeOptionApiRoute } from '~~/constants/routes-api'

const attributeOptions = ref<AttributeOption[]>([])

export default function useFilters() {
	async function fetchAttributeOptions() {
		const { data } = await useFetch<AttributeOption[]>(
			attributeOptionApiRoute.path,
			{ method: 'GET' },
		)

		if (data.value) {
			attributeOptions.value = data.value
		}
	}

	return {
		fetchAttributeOptions,
		attributeOptions,
	}
}
