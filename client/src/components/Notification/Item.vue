<script lang="ts">
import type { Notification } from '@client/stores/notification'
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'NotificationItem',
})
</script>

<script setup lang="ts">
defineProps<{
	item: Notification
}>()
</script>

<template>
	<Teleport to="#alerts">
		<dialog
			open
			class="notification-item"
		>
			{{ item.body }}
		</dialog>
	</Teleport>
</template>

<style lang="scss" scoped>
.notification-item {
	background-color: var(--secondary);
	padding: 1rem;
}
</style>
