import styles from './LoadingScreen.module.scss';
import Page from '@client/components/Page';

export default function LoadingScreen() {
	return (
		<Page className={styles.LoadingScreen}>
			<h1>Loading...</h1>
		</Page>
	);
}
