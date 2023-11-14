<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'Heading',
})
</script>

<script setup lang="ts">
defineProps<{
	type: 'small' | 'medium' | 'large'
	color: 'primary' | 'secondary'
}>()
</script>

<template>
	<h1
		:class="[type, color]"
		class="heading"
	>
		<slot />
	</h1>
</template>

<style lang="scss" scoped>
.heading {
	font-weight: 800;
	line-height: 120%;

	&.primary {
		color: var(--primary);
	}

	&.secondary {
		color: var(--secondary);
	}

	&.small {
		font-weight: 700;
		font-size: 1.5rem;
	}

	&.medium {
		font-size: 2rem;
	}

	&.large {
		font-size: clamp(2.5rem, 5vw, 4rem);
	}
}
</style>
