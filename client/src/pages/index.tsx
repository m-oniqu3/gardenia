import Page from '@client/components/Page';
import styles from './index.module.scss';
import Button from '@client/components/Button';
import { useAuth } from '@client/stores/auth';

export default function IndexPage() {
	const auth = useAuth();

	return (
		<Page className={styles.IndexPage}>
			<h1>Hello, IndexPage</h1>

			{auth.current && <p>Logged in as {auth.current}</p>}
			<Button onClick={() => auth.update('Hello')}>Test</Button>
		</Page>
	);
}
