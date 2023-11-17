<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'NavigationMain',
})
</script>

<script setup lang="ts"></script>

<template>
	<nav class="navigation-main">
		<AppLink
			class="logo"
			to="/"
		>
			<AppLogo />
		</AppLink>

		<AppLink
			to="/login"
			class="button-like"
		>
			Login
		</AppLink>
	</nav>
</template>

<style lang="scss" scoped>
.navigation-main {
	height: 10dvh;
	@include container;
	@include flex(row, space-between, center);

	.logo {
		text-decoration: none;
	}
}
</style>
