<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'LayoutDefault',
})
</script>

<script setup lang="ts"></script>

<template>
	<Layout class="layout-default">
		<slot />
	</Layout>
</template>

<style lang="scss" scoped>
.layout-default {
}
</style>
