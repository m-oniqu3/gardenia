<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'Container',
})
</script>

<template>
	<div class="container">
		<slot />
	</div>
</template>

<style lang="scss" scoped>
.container {
	width: 90%;
	margin: 0 auto;
}
</style>
