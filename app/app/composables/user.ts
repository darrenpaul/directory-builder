import type { User } from '@supabase/supabase-js'
import {
	ERROR,
	useToaster,
} from '~~/modules/toast-notification-module/runtime'

export default async function () {
	const router = useRouter()
	const { createNotification } = useToaster()

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
		userAuthenticated,
		userClaimsSiteAdmin,
	}
}
