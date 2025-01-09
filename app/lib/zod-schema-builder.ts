import { z } from 'zod'

export default class ZodSchemaBuilder {
	private schema: Record<
		string,
    z.ZodString | z.ZodOptional<z.ZodString> | undefined | null
	> = {}

	constructor() {
		this.schema = {}
	}

	withEmail() {
		this.schema.email = z.string().email().trim().toLowerCase()

		return this
	}

	withPassword() {
		this.schema.password = z.string().min(4).trim()

		return this
	}

	withName() {
		this.schema.name = z.string().min(1).trim()

		return this
	}

	withUrl(key: string) {
		this.schema[key] = z.optional(z.string().url().trim())

		return this
	}

	build() {
		const definedSchema = Object.fromEntries(
			Object.entries(this.schema).filter(([_, value]) => value !== undefined),
		) as { [k: string]: z.ZodType }

		return z.object(definedSchema)
	}
}
