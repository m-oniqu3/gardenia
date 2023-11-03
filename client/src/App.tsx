import LoadingScreen from '@client/components/LoadingScreen';
import { AuthContext, useAuth } from '@client/stores/auth';
import { ref } from '@client/utils/ref';
import { Routes } from '@generouted/react-router';
import { useEffect } from 'react';

export function App() {
	const auth = useAuth();
	const hasFetchedAuth = ref(false);

	async function fetchAuth() {
		console.log('fetching auth');
		try {
			await auth.fetch();
		} catch (error) {
			console.log('unauthed user', error);
		} finally {
			hasFetchedAuth.value = true;
		}
	}

	useEffect(() => {
		fetchAuth();
	}, []);

	console.log('App', auth.current);

	if (!hasFetchedAuth.value) return <LoadingScreen />;
	return (
		<AuthContext.Provider value={auth}>
			<Routes />
		</AuthContext.Provider>
	);
}
