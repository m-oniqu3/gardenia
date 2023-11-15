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
	>
		<slot />
	</button>
</template>

<style lang="scss" scoped>
.button {
	padding: 10px 20px;
	border: none;
	border-radius: 5px;
	transition: all 0.3s ease-in-out;
	text-decoration: none;
	font-weight: 500;
	font-size: 0.9rem;
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
