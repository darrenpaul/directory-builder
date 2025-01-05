import isAlpha from 'validator/lib/isAlpha'

export function nameValidation(name: string, label: string) {
	if (name) {
		if (isAlpha(name)) {
			return
		}

		return `Invalid ${label}`
	}

	return `${label} required`
}
