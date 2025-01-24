import type { SeoMetadata } from '~~/types/seo-metadata'

export interface Blog {
	id: string
	title: string
	slug: string
	description: string
	content: string
	thumbnailUri: string
	createdAt: string
	updatedAt: string
	metadata: SeoMetadata
}
