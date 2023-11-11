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
		<Container class="index-page">
			<h1>Hello</h1>
		</Container>
	</LayoutDefault>
</template>

<style lang="scss" scoped>
.index-page {
	// background-color: red;
}
</style>
