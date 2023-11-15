<script lang="ts">
import { computed, defineComponent, defineProps, withDefaults } from 'vue'

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
		hideLabel?: boolean
		inputAttrs?: Record<string, any>
		type?: string
	}>(),
	{
		type: 'text',
		inputAttrs: props => ({
			placeholder: props.label,
			required: true,
		}),
	},
)

const emit = defineEmits<{
	(event: 'update:modelValue', value: any): void
}>()

const value = computed({
	get: () => props.modelValue,
	set: value => emit('update:modelValue', value),
})

const rootClasses = computed(() => ({
	'hide-label': props.hideLabel,
	required: props.inputAttrs.required,
}))
</script>

<template>
	<div
		class="input-field"
		:class="rootClasses"
	>
		<label
			class="field-label"
			:for="props.id"
			:aria-hidden="props.hideLabel"
		>
			{{ props.label }}
		</label>

		<input
			v-bind="props.inputAttrs"
			:id="props.id"
			class="field-input"
			:type="props.type"
			v-model="value"
		/>
	</div>
</template>

<style lang="scss" scoped>
.input-field {
	margin-bottom: 0.8rem;
	width: 100%;

	&.required {
		.field-input::before {
			content: '*';
			color: red;
		}
	}

	&.hide-label {
		.field-label {
			visibility: hidden;
		}
	}

	.field-input {
		padding: 0.5rem 0;
		border: none;
		border-bottom: 1px solid #777777;
		width: 100%;

		&:focus {
			outline: none;
		}

		&::placeholder {
			color: #777777;
		}
	}
}
</style>
