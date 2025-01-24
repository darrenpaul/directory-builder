import { expect, it } from 'vitest'
import { joinUrlDirectories } from '~/lib/url-directory-join'

it('joins url directories', () => {
	const result = joinUrlDirectories(['a', 'b', 'c'])

	expect(result).toBe('/a/b/c')
})

it('joins url directories with trailing slash', () => {
	const result = joinUrlDirectories(['a', 'b', 'c/'])

	expect(result).toBe('/a/b/c')
})

it('joins url directories with leading slash', () => {
	const result = joinUrlDirectories(['/a', '/b', '/c'])

	expect(result).toBe('/a/b/c')
})

it('joins url directories with leading and trailing slash', () => {
	const result = joinUrlDirectories(['/a', '/b', '/c/'])

	expect(result).toBe('/a/b/c')
})
