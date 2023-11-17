<script lang="ts">
import { computed, defineComponent } from 'vue'

export default defineComponent({
	name: 'AppLink',
})
</script>

<script setup lang="ts">
const props = defineProps<{
	to: string
}>()

const isInternal = computed(() => props.to.startsWith('/'))
const tagName = computed(() => (isInternal.value ? 'RouterLink' : 'a'))
const attrName = computed(() => (isInternal.value ? 'to' : 'href'))
</script>

<template>
	<component
		:is="tagName"
		:[attrName]="props.to"
		class="app-link"
	>
		<slot />
	</component>
</template>

<style lang="scss" scoped>
.app-link {
}

.app-link.button-like {
	padding: 0.5em 1em;
	border-radius: 5px;
	transition: background-color 0.3s ease-in-out;
	text-decoration: none;
	font-weight: 500;
	font-size: 0.9em;

	background-color: var(--primary);
	color: var(--neutral);

	&:hover {
		background-color: var(--primary-dark);
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
