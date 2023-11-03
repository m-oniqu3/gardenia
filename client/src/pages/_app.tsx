import { Modals } from '@generouted/react-router';
import { Outlet } from 'react-router-dom';
import styles from './_app.module.scss';
import NavigationMain from '@client/components/Navigation/Main';

export default function AppLayout() {
	return (
		<div className={styles.AppLayout}>
			<NavigationMain />
			<Outlet />
			<Modals />
		</div>
	);
}
