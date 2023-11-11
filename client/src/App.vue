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
@import url('https://fonts.googleapis.com/css2?family=Karla:wght@200;300;400;500;600;700;800&display=swap');

:root {
	--primary: #355441;
	--secondary: #799473;
	--neutral: #ffffff;
	/* --tertiary: #00ff00; */
}

* {
	box-sizing: border-box;
	margin: 0;
	padding: 0;
}

body {
	font-family: 'Karla', sans-serif;
}

html,
body,
#app {
	margin: 0;
	padding: 0;
}
</style>
