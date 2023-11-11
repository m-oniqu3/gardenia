<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'PageLanding',
})
</script>

<script setup lang="ts"></script>

<template>
	<Page class="page-landing">
		<Container class="content">
			<Heading
				type="large"
				color="secondary"
			>
				The Social Hub for Plant Enthusiasts
			</Heading>
			<h1 class="heading"></h1>
			<p>
				Grow. Connect. Thrive. <br />
				Made for plant lovers, by plant lovers. <br />
				Join the community today!
			</p>

			<NavigationButtonLink
				type="secondary"
				to="/register"
			>
				Register
			</NavigationButtonLink>
		</Container>
	</Page>
</template>

<style lang="scss" scoped>
.page-landing {
	background-image: url('../../assets/plant-grid.png');
	background-size: 100%;

	background-repeat: no-repeat;
	background-position: bottom 0px right 0px;
	min-height: 90dvh;
	height: 90dvh;

	// media queries
	@include breakpoint(medium) {
		background-position: bottom -30px right 0px;
	}

	@include breakpoint(large) {
		background-position: bottom -60px right 0px;
	}

	.content {
		@include flex(column, center, center);
		text-align: center;
		height: 80%;
		max-width: 700px;

		p {
			@include text;
			max-width: 400px;
			margin: 1rem auto;
		}
	}
}
</style>
