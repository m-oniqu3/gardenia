<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'LayoutDefault',
})
</script>

<script setup lang="ts"></script>

<template>
	<AppLayout class="layout-default">
		<NavigationMain />

		<slot />
	</AppLayout>
</template>

<style lang="scss" scoped>
.layout-default {
	@include flex(column);
}
</style>
