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
		color?: 'primary' | 'secondary'
		disabled?: boolean
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
		:class="props.color"
		:disabled="props.disabled"
	>
		<slot />
	</button>
</template>

<style lang="scss" scoped>
.button {
	padding: 0.5em 1em;
	border: none;
	border-radius: 5px;
	transition: all 0.3s ease-in-out;
	text-decoration: none;
	font-weight: 500;
	font-size: 0.9em;
	cursor: pointer;

	&.primary {
		background-color: var(--primary);
		color: var(--neutral);

		&:hover {
			background-color: var(--primary-dark);
		}
	}

	&.secondary {
		background-color: var(--secondary);
		color: var(--neutral);

		&:hover {
			background-color: var(--primary);
		}
	}
}
</style>
