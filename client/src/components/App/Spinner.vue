<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'AppSpinner',
})
</script>

<script setup lang="ts"></script>

<template>
	<div class="app-spinner">
		<span class="loader"></span>
	</div>
</template>

<style lang="scss" scoped>
.app-spinner {
	.loader {
		width: 18px;
		height: 18px;
		border: 2.5px solid #fff;
		border-bottom-color: transparent;
		border-radius: 50%;
		display: inline-block;
		box-sizing: border-box;
		animation: rotation 1s linear infinite;
	}

	@keyframes rotation {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
}
</style>
