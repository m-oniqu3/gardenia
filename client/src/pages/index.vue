<script lang="ts">
import { useAuth } from '@client/stores/auth'
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'IndexPage',
})
</script>

<script setup lang="ts">
const auth = useAuth()
console.log(auth.current)
</script>

<template>
	<LayoutDefault>
		<LandingPage v-if="!auth.current" />
		<HomePage v-else />
	</LayoutDefault>
</template>

<style lang="scss" scoped></style>
