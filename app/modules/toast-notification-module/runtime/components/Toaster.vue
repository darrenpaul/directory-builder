<script setup lang="ts">
import type Notification from '~~/modules/toast-notification-module/runtime/models/notification'
import type NotificationQueueItem from '~~/modules/toast-notification-module/runtime/models/notification-queue-item'
import Bread from '~~/modules/toast-notification-module/runtime/components/Bread.vue'

const props = defineProps({
	notification: {
		type: Object as PropType<Notification>,
	},
	duration: {
		type: Number,
		default: 5,
	},
})

const notificationQueue = ref<NotificationQueueItem[]>([])

function generateUID(length: number): string {
	let uid = ''
	const characters
    = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
	const charactersLength = characters.length

	for (let i = 0; i < length; i++) {
		const randomIndex = Math.floor(Math.random() * charactersLength)
		uid += characters.charAt(randomIndex)
	}

	return uid
}

function removeNotificationFromQueue(id: string): void {
	notificationQueue.value = notificationQueue.value.filter(
		notification => notification.id !== id,
	)
}

watch([props], () => {
	if (props.notification) {
		notificationQueue.value.push({
			id: generateUID(5),
			title: props.notification.title,
			message: props.notification.message,
			type: props.notification.type,
		})
	}
})
</script>

<template>
	<div class="m-0 sm:m-0 sm:mr-16 fixed top-5 right-0 z-50 cursor-pointer">
		<TransitionGroup name="slide-fade">
			<Bread
				v-for="notificationQueueItem in notificationQueue"
				:key="notificationQueueItem.id"
				:notification-queue-item="notificationQueueItem"
				:on-timer-finish="removeNotificationFromQueue"
			/>
		</TransitionGroup>
	</div>
</template>

<style scoped>
@use "~~/modules/toast-notification-module/runtime/styles/styles.css";
</style>
