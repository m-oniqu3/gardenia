<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'PageLanding',
})
</script>

<script setup lang="ts"></script>

<template>
	<AppPage class="page-landing">
		<div class="content">
			<AppHeading
				type="large"
				color="secondary"
			>
				The Social Hub for Plant Enthusiasts
			</AppHeading>

			<p>
				Grow. Connect. Thrive. <br />
				Made for plant lovers, by plant lovers. <br />
				Join the community today!
			</p>

			<AppLink
				class="button-like secondary"
				to="/register"
			>
				Register
			</AppLink>
		</div>
	</AppPage>
</template>

<style lang="scss" scoped>
.page-landing {
	background-image: url('@/assets/plant-grid.png');
	background-size: 100%;
	background-repeat: no-repeat;
	background-position: bottom 0px right 0px;
	flex: 1;

	.content {
		@include container;
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

	// media queries
	@include breakpoint(medium) {
		background-position: bottom -30px right 0px;
	}

	@include breakpoint(large) {
		background-position: bottom -60px right 0px;
	}
}
</style>
