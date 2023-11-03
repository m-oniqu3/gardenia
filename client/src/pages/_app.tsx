import { Modals } from '@generouted/react-router';
import { Outlet } from 'react-router-dom';
import styles from './_app.module.scss';

export default function AppLayout() {
	return (
		<div className={styles.AppLayout}>
			<Outlet />
			<Modals />
		</div>
	);
}
