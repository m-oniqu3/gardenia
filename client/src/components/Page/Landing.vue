<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'PageLanding',
})
</script>

<script setup lang="ts"></script>

<template>
	<Page class="page-landing">
		<h1>The Social Hub for Plant Enthusiasts</h1>
		<p>
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod, fugit
			praesentium assumenda dict.
		</p>
		<ButtonLink
			type="primary"
			to="/register"
			>Register</ButtonLink
		>
	</Page>
</template>

<style lang="scss" scoped>
.page-landing {
	background-image: url('../../assets/plant-grid.png');
	background-size: 100%;

	background-repeat: no-repeat;
	background-position: bottom 0px right 0px;
	/* background-position: top 100px right 0px; */
	min-height: 90dvh;
	height: 90dvh;
}
</style>
