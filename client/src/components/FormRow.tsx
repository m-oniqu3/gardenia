import { ComponentChildren } from '@client/types';
import styles from './FormRow.module.scss';

export interface FormRowProps {
	children: ComponentChildren;
}

export default function FormRow({ children }: FormRowProps) {
	return <div className={styles.formRow}>{children}</div>;
}
