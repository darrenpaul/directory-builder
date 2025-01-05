import isStrongPassword from 'validator/lib/isStrongPassword'

const MIN_LENGTH = 8

export function passwordValidation(password: string) {
	if (password) {
		if (isStrongPassword(password, { min: MIN_LENGTH })) {
			return
		}

		return 'Password to weak'
	}

	return 'Password required'
}
