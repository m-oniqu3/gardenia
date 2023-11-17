<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'AppButton',
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
		class="app-button"
		:type="props.type"
		:class="props.color"
		:disabled="props.disabled"
	>
		<slot />
	</button>
</template>

<style lang="scss" scoped>
.app-button {
	padding: 0.5em 1em;
	border: none;
	border-radius: 5px;
	transition: all 0.3s ease-in-out;
	text-decoration: none;
	font-weight: 500;
	font-size: 0.9em;
	font-family: inherit;
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
