<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'NavigationMain',
})
</script>

<script setup lang="ts"></script>

<template>
	<nav class="navigation-main">
		<Container class="nav-container">
			<figure class="logo">
				<img
					src="../../assets/gardenia-logo.png"
					alt="gardenia logo"
				/>
				<figcaption>gardenia</figcaption>
			</figure>
			<ButtonLink
				to="/login"
				type="secondary"
			>
				Login
			</ButtonLink>
			<!-- <ButtonLink 
				v-if="auth.current"
				to="/login?logout=true"
			>
				Logout ({{ auth.current.name }})
			</ButtonLink>
			<RouterLink
				v-else
				to="/login"
			>
				Login
			</RouterLink> -->
		</Container>
	</nav>
</template>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css?family=Baloo Bhai');
.navigation-main {
	height: 10dvh;

	@include flex(row, center, center);

	.nav-container {
		@include flex(row, space-between, center);

		.logo {
			@include flex(row, space-between, center, 0.5);

			img {
				height: 30px;
				width: 30px;
			}

			figcaption {
				font-family: 'Baloo Bhai', cursive;
				font-size: 1.2rem;
				color: var(--primary);
			}
		}
	}
}
</style>
