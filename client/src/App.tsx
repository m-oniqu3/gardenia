import LoadingScreen from '@client/components/LoadingScreen';
import { AuthContext, useAuth } from '@client/stores/auth';
import { ref } from '@client/utils/ref';
import { Routes } from '@generouted/react-router';
import { useEffect } from 'react';

export function App() {
	const auth = useAuth();
	const hasFetchedAuth = ref(false);

	async function fetch() {
		try {
			await auth.fetch();
		} catch (err) {
			console.error('user is unauthed', err);
		} finally {
			hasFetchedAuth.value = true;
		}
	}

	useEffect(() => {
		fetch();
	}, []);

	if (!hasFetchedAuth.value) return <LoadingScreen />;
	return (
		<AuthContext.Provider value={auth}>
			<Routes />
		</AuthContext.Provider>
	);
}
