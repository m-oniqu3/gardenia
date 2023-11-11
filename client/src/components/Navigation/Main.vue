<script lang="ts">
import ButtonLink from '@client/components/Navigation/ButtonLink.vue'
import Logo from '@client/components/Navigation/Logo.vue'
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'NavigationMain',
	components: { Logo, ButtonLink },
})
</script>

<script setup lang="ts"></script>

<template>
	<nav class="navigation-main">
		<Container class="nav-container">
			<Logo />
			<ButtonLink
				to="/login"
				type="secondary"
			>
				Login
			</ButtonLink>
		</Container>
	</nav>
</template>

<style lang="scss" scoped>
.navigation-main {
	height: 10dvh;

	@include flex(row, center, center);

	.nav-container {
		@include flex(row, space-between, center);
	}
}
</style>

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
