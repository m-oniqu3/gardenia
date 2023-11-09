<script setup lang="ts"></script>

<template>
	<Suspense>
		<template #fallback>
			<LoadingScreen />
		</template>

		<AuthLoader>
			<RouterView />
		</AuthLoader>
	</Suspense>
</template>

<style lang="scss">
:root {
	--primary: #ff0000;
	--secondary: #0000ff;
	--tertiary: #00ff00;
}

* {
	box-sizing: border-box;
}

html,
body,
#app {
	margin: 0;
	padding: 0;
}
</style>
