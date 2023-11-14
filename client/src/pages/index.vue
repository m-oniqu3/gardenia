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
	<LayoutDefault :show-button="true">
		<PageLanding v-if="!auth.current" />
		<PageHome v-else />
	</LayoutDefault>
</template>

<style lang="scss" scoped></style>
