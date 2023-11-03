import { AuthContext, useAuth } from '@client/stores/auth';
import { Routes } from '@generouted/react-router';

export function App() {
	const auth = useAuth();

	return (
		<AuthContext.Provider value={auth}>
			<Routes />
		</AuthContext.Provider>
	);
}
