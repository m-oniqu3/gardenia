<script setup lang="ts">
import { useNotifications } from '@client/stores/notification'

const notifications = useNotifications()
</script>

<template>
	<Suspense>
		<template #fallback>
			<LoadingScreen />
		</template>

		<AuthLoader>
			<RouterView />
		</AuthLoader>
	</Suspense>

	<NotificationDisplay v-if="notifications.items.size" />
</template>

<style lang="scss">
:root {
	--primary: #355441;
	--primary-dark: #00481c;
	--secondary: #799473;
	--neutral: #ffffff;
	--error: #ff0000;

	/* --tertiary: #00ff00; */
}

* {
	box-sizing: border-box;
	margin: 0;
	padding: 0;
	font-family: 'Karla', sans-serif;
}

html,
body,
#app {
	margin: 0;
	padding: 0;
}
</style>
