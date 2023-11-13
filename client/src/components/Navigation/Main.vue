<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'NavigationMain',
})
</script>

<script setup lang="ts"></script>

<template>
	<nav class="navigation-main">
		<NavigationLogo />
		<NavigationButtonLink
			to="/login"
			type="primary"
		>
			Login
		</NavigationButtonLink>
	</nav>
</template>

<style lang="scss" scoped>
.navigation-main {
	height: 10dvh;
	@include container;
	@include flex(row, space-between, center);
}
</style>
