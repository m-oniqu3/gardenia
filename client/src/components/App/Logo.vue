<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'AppLogo',
})
</script>

<script setup lang="ts"></script>

<template>
	<figure class="app-logo">
		<img
			src="@/assets/gardenia-logo.png"
			alt="gardenia logo"
		/>
		<figcaption class="color-primary">gardenia</figcaption>
	</figure>
</template>

<style lang="scss" scoped>
.app-logo {
	@include flex(row, flex-start, center, 0.5);

	img {
		height: 28px;
		width: 28px;
	}

	figcaption {
		font-family: 'Baloo Bhai', cursive;
		font-size: clamp(1.2rem, 5vw, 1.5rem);
		font-weight: normal;
		position: relative;
		top: 2px;
	}
}
</style>
