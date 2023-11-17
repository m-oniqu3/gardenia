<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'NavigationLogo',
})
</script>

<script setup lang="ts"></script>

<template>
	<figure class="navigation-logo">
		<img
			src="@/assets/gardenia-logo.png"
			alt="gardenia logo"
		/>
		<figcaption>gardenia</figcaption>
	</figure>
</template>

<style lang="scss" scoped>
.navigation-logo {
	@include flex(row, space-between, center, 0.5);

	img {
		height: 28px;
		width: 28px;
	}

	figcaption {
		font-family: 'Baloo Bhai', cursive;
		font-size: clamp(1.2rem, 5vw, 1.5rem);
		font-weight: normal;
		color: var(--primary);
		position: relative;
		top: 2px;
	}
}
</style>
