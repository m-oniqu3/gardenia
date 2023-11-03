import Button from '@client/components/Button';
import { useModals } from '@client/router';

export default function TestModal() {
	const modals = useModals();
	return (
		<div>
			<h1>TestModal</h1>
			<Button onClick={() => modals.close()}>Close</Button>
		</div>
	);
}
