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
		<NotificationItem
			v-for="(item, _i) in items"
			:key="_i"
			:item="item"
		/>
	</div>
</template>

<style lang="scss" scoped>
.notification-display {
	@include flex(column);
	row-gap: 0.5em;
	padding: 0.5em;

	position: fixed;
	bottom: 0;
	right: 0;
	overflow: hidden;
}
</style>
