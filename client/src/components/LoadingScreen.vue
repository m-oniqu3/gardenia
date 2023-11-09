<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'LoadingScreen',
})
</script>

<script setup lang="ts"></script>

<template>
	<div class="loading-screen">
		<h1>Loading...</h1>
	</div>
</template>

<style lang="scss" scoped>
.loading-screen {
	@include flex(column, center, center);

	width: 100vw;
	height: 100vh;

	overflow: hidden;
}
</style>
