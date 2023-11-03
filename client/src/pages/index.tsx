import Page from '@client/components/Page';
import styles from './index.module.scss';
import { useModals } from '@client/router';
import Button from '@client/components/Button';

export default function IndexPage() {
	const modals = useModals();

	return (
		<Page className={styles.IndexPage}>
			<h1>Hello, IndexPage</h1>
			<Button onClick={() => modals.open('/modal')}>Open Modal</Button>
		</Page>
	);
}
