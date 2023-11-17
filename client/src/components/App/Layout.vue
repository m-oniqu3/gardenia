<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'AppLayout',
})
</script>

<script setup lang="ts"></script>

<template>
	<div class="app-layout">
		<slot />
	</div>
</template>

<style lang="scss" scoped>
.app-layout {
	width: 100%;
}
</style>
