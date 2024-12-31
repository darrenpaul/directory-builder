export interface PlaceResponse {
	id: string
	slug: string
	name: string
	address: PlaceAddress[]
	images: PlaceImage[]
	rating: PlaceRating[]
	attributes: PlaceAttribute[]
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
	address: PlaceAddress
	images: PlaceImage[]
	rating: PlaceRating
	attributes: PlaceAttribute[]
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
}

export interface PlaceImage {
	id: string
	placeId: string
	imageUrl: string
	sortOrder: number
}
