import clsx, { ClassValue } from 'clsx';
import styles from './Page.module.scss';
import { ComponentChildren } from '@client/types';

export interface PageProps {
	className?: ClassValue;
	children?: ComponentChildren;
}

export default function Page({ className, children }: PageProps) {
	return <main className={clsx(styles.Page, className)}>{children}</main>;
}
