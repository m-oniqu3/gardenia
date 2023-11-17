<script lang="ts">
import { computed, defineComponent } from 'vue'

export default defineComponent({
	name: 'AppHeading',
})
</script>

<script setup lang="ts">
const props = withDefaults(
	defineProps<{
		type?: 'small' | 'medium' | 'large'
		color?: 'primary' | 'secondary'
	}>(),
	{
		type: 'medium',
		color: 'primary',
	},
)

const color = computed(() => `color-${props.color}`)
</script>

<template>
	<h1
		:class="[props.type, color]"
		class="app-heading"
	>
		<slot />
	</h1>
</template>

<style lang="scss" scoped>
.app-heading {
	font-weight: 800;
	line-height: 120%;

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
