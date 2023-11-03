import { AuthContext, useAuth } from '@client/stores/auth';
import { Routes } from '@generouted/react-router';
import { useEffect } from 'react';

export function App() {
	const auth = useAuth();

	useEffect(() => {
		auth.current = 'hello';
	}, []);

	return (
		<AuthContext.Provider value={auth}>
			<Routes />
		</AuthContext.Provider>
	);
}
