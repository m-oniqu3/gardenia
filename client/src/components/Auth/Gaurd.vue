<script lang="ts">
import { useAuth } from '@client/stores/auth'
import { watch } from 'vue'
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router/auto'

export default defineComponent({
	name: 'AuthGaurd',
})
</script>

<script setup lang="ts">
const auth = useAuth()
const router = useRouter()

watch(
	router.currentRoute,
	async currentRoute => {
		if (!auth.current && !currentRoute.path.startsWith('/login'))
			await router.push(`/login?redirect=${currentRoute.path}`)
	},
	{
		immediate: true,
	},
)
</script>

<template>
	<slot />
</template>
