<script lang="ts">
import { computed, defineComponent } from 'vue'

export default defineComponent({
	name: 'InputField',
})
</script>

<script setup lang="ts">
const props = withDefaults(
	defineProps<{
		id: string
		label: string
		modelValue: any
		type?: string
	}>(),
	{
		type: 'text',
	},
)

const emit = defineEmits<{
	(event: 'update:modelValue', value: any): void
}>()

const value = computed({
	get: () => props.modelValue,
	set: value => emit('update:modelValue', value),
})
</script>

<template>
	<div class="input-field">
		<input
			:id="props.id"
			class="field-input"
			:type="props.type"
			v-model="value"
			:placeholder="props.label"
		/>
	</div>
</template>

<style lang="scss" scoped>
.input-field {
	margin-bottom: 0.8rem;
	width: 100%;

	.field-input {
		padding: 0.5rem 0;
		border: none;
		border-bottom: 1px solid #777777;
		width: 100%;

		&:focus {
			outline: none;
		}
	}
}
</style>
