<script setup lang="ts">
import type NotificationQueueItem from '~~/modules/toast-notification-module/runtime/models/notification-queue-item'
import {
	INFO,
	SUCCESS,
	WARN,
} from '~~/modules/toast-notification-module/runtime/constants/notification-types'

const props = defineProps({
	notificationQueueItem: {
		type: Object as PropType<NotificationQueueItem>,
		required: true,
	},
	duration: { type: Number, default: 5 },
	onTimerEnd: { type: Function, default: () => {} },
	onTimerFinish: { type: Function, required: true },
})

const durationLeft = ref(props.duration)
const timer = ref<NodeJS.Timeout>()

function clearNotification(): void {
	props.onTimerEnd(false)
	props.onTimerFinish(props.notificationQueueItem.id)
}

function createTimer(): void {
	timer.value = setInterval(() => {
		durationLeft.value++
		if (durationLeft.value >= props.duration)
			props.onTimerFinish(props.notificationQueueItem.id)
	}, 1000)
}

const notificationStyle = computed(() => {
	switch (props.notificationQueueItem.type) {
		case WARN:
			return 'bg-orange-400'
		case INFO:
			return 'bg-red-300 border-slate-300'
		case SUCCESS:
			return 'border-slate-300 bg-slate-400'
		default:
			return 'bg-red-500 border-slate-300'
	}
})

onMounted(() => {
	durationLeft.value = 0
	createTimer()
})

onUnmounted(() => {
	if (timer.value)
		clearInterval(timer.value)
})
</script>

<template>
	<div
		class="py-3 px-6 mb-3 flex items-center justify-center border-4 drop-shadow"
		:class="[notificationStyle]"
		@click="clearNotification"
	>
		<p class="p-0 m-0">
			{{ props.notificationQueueItem.message }}
		</p>
	</div>
</template>
