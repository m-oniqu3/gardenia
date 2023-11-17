<script lang="ts">
import { useAuth } from '@client/stores/auth'
import { useNotifications } from '@client/stores/notification'
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'IndexPage',
})
</script>

<script setup lang="ts">
const auth = useAuth()
const notifications = useNotifications()
</script>

<template>
	<LayoutDefault :show-button="true">
		<Button
			@click="
				notifications.push({
					type: 'info',
					title: 'Hello World!',
					body: 'This is a test notification.',
				})
			"
		>
			Click Me!
		</Button>

		<PageLanding v-if="!auth.current" />
		<PageHome v-else />
	</LayoutDefault>
</template>

<style lang="scss" scoped></style>
