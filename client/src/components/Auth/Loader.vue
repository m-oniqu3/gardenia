<script lang="ts">
import { useAuth } from '@client/stores/auth'
import { isAxiosError } from 'axios'
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'AuthLoader',
})
</script>

<script setup lang="ts">
const auth = useAuth()

try {
	await auth.fetch()
} catch (error) {
	if (isAxiosError(error)) {
		console.log('unauthed user:', error.message)
	}
}
</script>

<template>
	<slot />
</template>
