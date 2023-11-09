<script lang="ts">
import { useAuth } from '@client/stores/auth'
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'NavigationMain',
})
</script>

<script setup lang="ts">
const auth = useAuth()
</script>

<template>
	<div class="navigation-main">
		<RouterLink
			v-if="auth.current"
			to="/login?logout=true"
		>
			Logout ({{ auth.current.name }})
		</RouterLink>
		<RouterLink
			v-else
			to="/login"
		>
			Login
		</RouterLink>
	</div>
</template>

<style lang="scss" scoped>
.navigation-main {
}
</style>
