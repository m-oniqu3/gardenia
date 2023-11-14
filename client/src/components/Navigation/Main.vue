<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'NavigationMain',
})
</script>

<script setup lang="ts">
const props = defineProps<{
	showButton: boolean
}>()
</script>

<template>
	<nav class="navigation-main">
		<NavigationLogo />
		<NavigationButtonLink
			v-if="props.showButton"
			to="/login"
			type="primary"
		>
			Login
		</NavigationButtonLink>
	</nav>
</template>

<style lang="scss" scoped>
.navigation-main {
	z-index: -1;
	height: 10dvh;
	@include container;
	@include flex(row, space-between, center);
}
</style>
