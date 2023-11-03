import { ClassValue } from 'clsx';
import styles from './InputField.module.scss';
import { Ref, ref } from '@client/utils/ref';
import clsx from 'clsx';
import { ChangeEventHandler, JSXElementConstructor } from 'react';

export type InputValue = string | number | readonly string[] | undefined;
export type InputRef = Ref<InputValue>;

export interface InputFieldProps {
	id: string;
	label: string;
	type?: string;
	value?: InputRef;
	className?: ClassValue;
}

export function InputField({
	id,
	label,
	type = 'text',
	value = ref(''),
	className,
}: InputFieldProps) {
	const InputElement = type === 'textarea' ? 'textarea' : 'input';

	return (
		<div className={clsx(styles.InputField, type, className)}>
			<label
				htmlFor={id}
				className={styles.FieldLabel}
			>
				{label}
			</label>

			<InputElement
				id={id}
				className={styles.FieldInput}
				type={type}
				value={value.value}
				onChange={e => (value.value = e.target.value)}
			/>
		</div>
	);
}
