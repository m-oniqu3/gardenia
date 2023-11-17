<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'AppPage',
})
</script>

<template>
	<div class="app-page">
		<slot />
	</div>
</template>

<style lang="scss" scoped>
.app-page {
	width: 100%;
}
</style>
