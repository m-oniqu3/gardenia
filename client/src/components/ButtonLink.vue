<script lang="ts">
import { computed, defineComponent } from 'vue'

export default defineComponent({
	name: 'ButtonLink',
})
</script>

<script setup lang="ts">
const props = defineProps<{
	to: string
	type: 'primary' | 'secondary'
}>()

const color = computed(() => {
	if (props.type === 'primary') return 'primary'
	else if (props.type === 'secondary') return 'secondary'
})
</script>

<template>
	<RouterLink
		to="to"
		:class="color"
		class="button-link"
	>
		<slot />
	</RouterLink>
</template>

<style lang="scss" scoped>
.button-link {
	padding: 7px 20px;
	border-radius: 5px;
	transition: all 0.3s ease-in-out;
	text-decoration: none;
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
