import Page from '@client/components/Page';
import styles from './index.module.scss';
import { useAuth } from '@client/stores/auth';

export default function IndexPage() {
	const auth = useAuth();
	console.log('Index', auth.current);

	return (
		<Page className={styles.IndexPage}>
			<h1>Hello, IndexPage</h1>

			{auth.current && <p>Logged in as {auth.current}</p>}
		</Page>
	);
}
