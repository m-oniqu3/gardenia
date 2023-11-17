<script setup lang="ts"></script>

<template>
	<Suspense>
		<template #fallback>
			<LoadingScreen />
		</template>

		<AuthLoader>
			<NotificationDisplay />
			<RouterView />
		</AuthLoader>
	</Suspense>
</template>

<style lang="scss">
:root {
	--primary: #355441;
	--primary-text: white;
	--primary-dark: #00481c;
	--secondary: #799473;
	--secondary-text: white;
	--neutral: #ffffff;
	--error: #ff0000;

	/* --tertiary: #00ff00; */
}

* {
	box-sizing: border-box;
}

html,
body,
#app {
	margin: 0;
	padding: 0;
	font-family: 'Karla', sans-serif;
}

@import '@/styles/global.scss';
</style>
