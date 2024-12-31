import type Notification from '~~/modules/toast-notification-module/runtime/models/notification'

const notification = ref<Notification | undefined>(undefined)

export default function useToaster() {
	function createNotification({ type, title, message }: Notification) {
		notification.value = { type, title, message }
	}
	return { notification, createNotification }
}
