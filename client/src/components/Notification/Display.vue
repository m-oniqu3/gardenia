<script lang="ts">
import { useNotifications } from '@client/stores/notification'
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'NotificationDisplay',
})
</script>

<script setup lang="ts">
const notifications = useNotifications()

const items = notifications.items
</script>

<template>
	<div class="notification-display">
		<div
			v-for="item in items"
			:key="Date.now()"
		>
			<NotificationItem :item="item" />
		</div>
	</div>
</template>

<style lang="scss" scoped>
.notification-display {
	position: fixed;
	top: 0;
	right: 0;
	width: 40%;
	height: 100%;
	overflow: hidden;
	background-color: aqua;
}
</style>
