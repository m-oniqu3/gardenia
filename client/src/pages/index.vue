<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'IndexPage',
})
</script>

<script setup lang="ts"></script>

<template>
	<LayoutDefault>
		<Page class="index-page">
			<h1>Hello</h1>
		</Page>
	</LayoutDefault>
</template>

<style lang="scss" scoped>
.index-page {
	// background-color: red;
}
</style>
