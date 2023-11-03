import { ComponentChildren } from '@client/types';
import styles from './Form.module.scss';
import { FormEvent } from 'react';
import clsx, { ClassValue } from 'clsx';

export interface FormProps {
	prevent?: boolean;
	className?: ClassValue;
	onSubmit: (e: FormEvent) => any;
	children: ComponentChildren;
}

export default function Form({
	onSubmit,
	prevent = true,
	children,
	className,
}: FormProps) {
	function submit(event: FormEvent) {
		if (prevent) event.preventDefault();
		onSubmit(event);
	}

	return (
		<form
			className={clsx(styles.form, className)}
			onSubmit={submit}
		>
			{children}
		</form>
	);
}
