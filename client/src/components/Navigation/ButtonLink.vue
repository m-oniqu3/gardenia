<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'NavigationButtonLink',
})
</script>

<script setup lang="ts">
const props = defineProps<{
	to: string
	type: 'primary' | 'secondary'
}>()
</script>

<template>
	<Link
		:to="props.to"
		:class="props.type"
		class="button-link"
	>
		<slot />
	</Link>
</template>

<style lang="scss" scoped>
.button-link {
	padding: 7px 20px;
	border-radius: 5px;
	transition: all 0.3s ease-in-out;
	text-decoration: none;
	font-weight: 500;
	font-size: 0.9rem;
	&.primary {
		background-color: var(--primary);
		color: var(--neutral);
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
