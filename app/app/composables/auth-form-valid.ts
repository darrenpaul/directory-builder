import { emailValidation } from '~/lib/input-validation/email-validation'
import { nameValidation } from '~/lib/input-validation/name-validation'
import { passwordValidation } from '~/lib/input-validation/password-validation'

export default function ({ email, password, firstName, lastName }) {
	const emailValid = computed(() => {
		if (email.value === undefined) {
			return undefined
		}

		const error = emailValidation(email.value)

		if (error) {
			return error
		}

		return null
	})

	const passwordValid = computed(() => {
		if (password.value === undefined) {
			return undefined
		}

		const error = passwordValidation(password.value)

		if (error) {
			return error
		}

		return null
	})

	const firstNameValid = computed(() => {
		if (!firstName) {
			return null
		}

		if (firstName.value === undefined) {
			return undefined
		}

		const error = nameValidation(firstName.value, 'first name')

		if (error) {
			return error
		}

		return null
	})

	const lastNameValid = computed(() => {
		if (!lastName) {
			return null
		}

		if (lastName.value === undefined) {
			return undefined
		}

		const error = nameValidation(lastName.value, 'last name')

		if (error) {
			return error
		}

		return null
	})

	const canSubmitSignIn = computed(() => {
		return emailValid.value === null && passwordValid.value === null
	})

	const canSubmitSignUp = computed(() => {
		return (
			emailValid.value === null
			&& passwordValid.value === null
			&& firstNameValid.value === null
			&& lastNameValid.value === null
		)
	})

	function clearFields() {
		email.value = undefined
		password.value = undefined
	}

	return {
		emailValid,
		passwordValid,
		firstNameValid,
		lastNameValid,
		canSubmitSignIn,
		canSubmitSignUp,
		clearFields,
	}
}
