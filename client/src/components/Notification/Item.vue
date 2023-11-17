<script lang="ts">
import type { Notification } from '@client/stores/notification'
import { computed } from 'vue'
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'NotificationItem',
})
</script>

<script setup lang="ts">
const props = defineProps<{
	item: Notification
}>()

const item = computed(() => props.item)
</script>

<template>
	<div class="notification-item">
		{{ item.body }}
	</div>
</template>

<style lang="scss" scoped>
.notification-item {
	background-color: var(--secondary);
	color: var(--secondary-text);
	padding: 1em;
}
</style>
