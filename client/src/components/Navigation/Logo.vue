<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'Logo',
})
</script>

<script setup lang="ts"></script>

<template>
	<figure class="navigation-logo">
		<img
			src="../../assets/gardenia-logo.png"
			alt="gardenia logo"
		/>
		<figcaption>gardenia</figcaption>
	</figure>
</template>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css?family=Baloo Bhai');
.navigation-logo {
	@include flex(row, space-between, center, 0.5);

	img {
		height: 25px;
		width: 25px;
	}

	figcaption {
		font-family: 'Baloo Bhai', cursive;
		font-size: 1.2rem;
		color: var(--primary);
		position: relative;
		top: 2px;
	}
}
</style>
