import type { User } from '@supabase/supabase-js'
import { userApiRoute } from '~~/constants/routes-api'
import {
	ERROR,
	useToaster,
} from '~~/modules/toast-notification-module/runtime'

export default async function () {
	const router = useRouter()
	const { createNotification } = useToaster()

	const { data } = await useFetch<User>(userApiRoute.path, {
		method: 'GET',
	})

	function userAuthenticated(user: User | null) {
		if (user) {
			return
		}

		createNotification({
			title: '',
			message: 'Unauthorized',
			type: ERROR,
		})

		router.replace('/')
	}

	function userClaimsSiteAdmin(user: User) {
		if (user.app_metadata.claims_site_admin) {
			return
		}

		createNotification({
			title: '',
			message: 'Unauthorized',
			type: ERROR,
		})

		router.replace('/')
	}

	return {
		user: data.value,
		userAuthenticated,
		userClaimsSiteAdmin,
	}
}
