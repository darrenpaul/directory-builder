import type { SupabaseClient } from '@supabase/supabase-js'
import { kebabCase } from 'lodash-es'
import { DatabaseTable } from '~~/constants/database-table'

function generateSlug(keys: string[]) {
	return kebabCase(keys.join(' '))
}

export async function createPlaceOperatingPeriodBatch(
	supabaseClient: SupabaseClient,
	payload: {
		placeId: string
		operatingPeriods: {
			dayIndex: number
			day: string
			opensAt: string
			closesAt: string
		}[]
	},
) {
	const now = new Date()

	const placeOperatingPeriods = payload.operatingPeriods.map(
		(operatingPeriod) => {
			return {
				place_id: payload.placeId,
				slug: generateSlug([
					payload.placeId,
					operatingPeriod.day,
					operatingPeriod.opensAt,
					operatingPeriod.closesAt,
				]),
				day_index: operatingPeriod.dayIndex,
				day: operatingPeriod.day,
				opens_at: operatingPeriod.opensAt,
				closes_at: operatingPeriod.closesAt,
				created_at: now,
			}
		},
	)

	const { data, error } = await supabaseClient
		.from(DatabaseTable.PLACE_OPERATING_PERIOD)
		.upsert(placeOperatingPeriods, { onConflict: 'slug' })

	return { data, error }
}
