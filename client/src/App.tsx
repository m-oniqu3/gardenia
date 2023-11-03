import { InputField } from '@client/components/InputField';
import { AuthContext, useAuth } from '@client/stores/auth';
import { computed } from '@client/utils/computed';
import { Routes } from '@generouted/react-router';

export function App() {
	const auth = useAuth();
	const name = computed(
		() => auth.current ?? '',
		v => auth.$update('current', v.length ? v : null),
	);

	return (
		<AuthContext.Provider value={auth}>
			<Routes />
			<InputField
				id="name"
				label="Name"
				value={name}
			/>
		</AuthContext.Provider>
	);
}
