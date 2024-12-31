import type { NotificationType } from '~~/modules/toast-notification-module/runtime/constants/notification-types'

export default interface Notification {
	title: string
	message: string
	type: NotificationType
}
