import crypto from 'node:crypto'
import { kebabCase } from 'lodash-es'

export default function generateSlug(items: string[] | number[]) {
	const kebabCased = kebabCase(items.join(' '))

	const hash = crypto.createHash('sha256')

	hash.update(kebabCased)

	return hash.digest('hex')
}
