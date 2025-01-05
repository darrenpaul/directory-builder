import isEmail from 'validator/lib/isEmail'

export function emailValidation(email: string) {
	if (email) {
		if (isEmail(email)) {
			return
		}

		return 'Invalid email address'
	}

	return 'Email address required'
}
