<script lang="ts">
import { computed } from 'vue'
import { defineComponent } from 'vue'

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
		<label
			class="field-label"
			:for="props.id"
		>
			{{ props.label }}
		</label>

		<input
			:id="props.id"
			class="field-input"
			:type="props.type"
			v-model="value"
		/>
	</div>
</template>

<style lang="scss" scoped>
.input-field {
	@include flex(column);
	gap: 0.5em;

	.field-label,
	.field-input {
		width: 100%;
		font-size: 1em;
	}

	.field-input {
		padding: 1em;
	}
}
</style>
