<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'Page',
})
</script>

<template>
	<div class="page">
		<slot />
	</div>
</template>

<style lang="scss" scoped>
.page {
	max-width: 800px;
	background-color: green;
}
</style>
