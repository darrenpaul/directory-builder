import type { NotificationType } from '~~/modules/toast-notification-module/runtime/constants/notification-types'

export default interface NotificationQueueItem {
	id: string
	title: string
	message: string
	type: NotificationType
}
