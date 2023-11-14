<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'LayoutDefault',
})
</script>

<script setup lang="ts">
const props = defineProps<{
	showButton: boolean
}>()
</script>

<template>
	<Layout class="layout-default">
		<NavigationMain :show-button="props.showButton" />

		<slot />
	</Layout>
</template>

<style lang="scss" scoped>
.layout-default {
}
</style>
