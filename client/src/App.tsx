import { AuthContext, createAuth } from '@client/stores/auth';
import { Routes } from '@generouted/react-router';
import { useEffect } from 'react';

export function App() {
	const auth = createAuth();

	useEffect(() => {
		auth.current = 'hello';
	}, []);

	return (
		<AuthContext.Provider value={auth.$provide}>
			<Routes />
		</AuthContext.Provider>
	);
}
