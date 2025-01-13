import type { AddressComponent, Photo, Place } from '@types/google.maps'

const daysOfTheWeek = [
	'Monday',
	'Tuesday',
	'Wednesday',
	'Thursday',
	'Friday',
	'Saturday',
	'Sunday',
]

function getLongText(addressComponentData: Record<string, string> | undefined) {
	if (!addressComponentData) {
		return
	}

	if (Object.keys(addressComponentData).includes('long_name')) {
		return addressComponentData.long_name
	}

	if (addressComponentData.longText !== undefined) {
		return addressComponentData.longText
	}

	return undefined
}

export function parseAddressComponent(addressComponents: AddressComponent[]) {
	const streetNumber = getLongText(
		addressComponents.find(component =>
			component.types.includes('street_number'),
		),
	)

	const streetName = getLongText(
		addressComponents.find(component => component.types.includes('route')),
	)

	const city = getLongText(
		addressComponents.find((component) => {
			if (component.types.includes('locality')) {
				return component
			}

			return ''
		}),
	)

	const state = getLongText(
		addressComponents.find(component =>
			component.types.includes('administrative_area_level_1'),
		),
	)

	const country = getLongText(
		addressComponents.find(component => component.types.includes('country')),
	)

	const postalCode = getLongText(
		addressComponents.find(component =>
			component.types.includes('postal_code'),
		),
	)

	return {
		streetAddress: [streetNumber, streetName].filter(Boolean).join(' '),
		city,
		state,
		country,
		postalCode,
	}
}
function createTimeString(hour: number, minute: number) {
	return `${hour.toFixed(0).padStart(2, '0')}:${minute.toFixed(0).padStart(2, '0')}`
}

function parseRegularOpeningHours(regularOpeningHours: RegularOpeningHours) {
	if (!regularOpeningHours?.periods) {
		return []
	}

	return regularOpeningHours.periods.map((period: Period) => {
		if (!period || !period.open || !period.close) {
			return null
		}

		return {
			dayIndex: period.open.day,
			day: daysOfTheWeek[period.open.day],
			opensAt: createTimeString(period.open.hour, period.open.minute),
			closesAt: createTimeString(period.close.hour, period.close.minute),
		}
	})
}

export function parseGooglePlace(place: Place) {
	const parsedAddressComponents = parseAddressComponent(
		place.addressComponents,
	)

	const images = place?.photos
		.slice(0, 10)
		.map((photo: Photo) => photo.getURI({ maxHeight: 1000 }))

	return {
		googlePlaceId: place.id,
		displayName: place.displayName,
		coordinates: [place.location?.lat(), place.location?.lng()].join(','),
		images,
		rating: place.rating,
		userRatingCount: place.userRatingCount,
		website: place.websiteURI,
		price: place.priceLevel,
		operatingPeriods: parseRegularOpeningHours(place.regularOpeningHours),
		attributes: [
			{
				label: 'Dogs Allowed',
				key: 'allowsDogs',
				value: place.allowsDogs || false,
			},
			{
				label: 'Has Dine-In',
				key: 'hasDineIn',
				value: place.hasDineIn || false,
			},
			{
				label: 'Has Restroom',
				key: 'hasRestroom',
				value: place.hasRestroom || false,
			},
			{
				label: 'Has Delivery',
				key: 'hasDelivery',
				value: place.hasDelivery || false,
			},
			{
				label: 'Has Takeout',
				key: 'hasTakeout',
				value: place.hasTakeout || false,
			},
		],
		...parsedAddressComponents,
	}
}
