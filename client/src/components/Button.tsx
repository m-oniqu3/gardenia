import { ComponentChildren } from '@client/types';
import styles from './Button.module.scss';
import clsx from 'clsx';
import { ButtonHTMLAttributes } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: ComponentChildren;
}

export default function Button({
	type = 'button',
	className,
	children,
	...attrs
}: ButtonProps) {
	return (
		<button
			{...attrs}
			className={clsx(styles.button, className)}
			type={type}
		>
			{children}
		</button>
	);
}
