<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'Button',
})
</script>

<script setup lang="ts">
const props = withDefaults(
	defineProps<{
		type?: 'button' | 'submit' | 'reset'
	}>(),
	{
		type: 'button',
	},
)
</script>

<template>
	<button
		class="button"
		:type="props.type"
	>
		<slot />
	</button>
</template>

<style lang="scss" scoped>
.button {
}
</style>
