import type { OperatingPeriod } from '~~/types/operating-period'

export interface PlaceVerified {
	id: string
	status: string
}

export interface PlaceAttribute {
	id: string
	label: string
	key: string
	value: string
}

export interface Place {
	id: string
	slug: string
	name: string
	website: string
	price: string
	description: string
	metaTitle: string
	metaDescription: string
	menu: string
	facebook: string
	instagram: string
	twitter: string
	phone: string
	specials: string
	address: PlaceAddress
	images: PlaceImage[]
	rating: PlaceRating
	attributes: PlaceAttribute[]
	verified: PlaceVerified | null
	operatingPeriods: OperatingPeriod[]
}

export interface PlaceRating {
	score: number
	count: number
}

export interface PlaceAddress {
	id: string
	streetAddress: string
	city: string
	state: string
	country: string
	postalCode: string
	coordinates: string
}

export interface PlaceImage {
	id: string
	placeId: string
	imageUrl: string
	sortOrder: number
}
