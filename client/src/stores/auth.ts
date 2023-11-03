import { createStore } from '@client/utils/createStore';

export interface AuthState {
	current: null | string;
	readonly isLoggedIn: boolean;
}

export const [createAuth, useAuth, AuthContext] = createStore<AuthState>(
	'Auth',
	() => ({
		current: null,
		get isLoggedIn() {
			return this.current !== null;
		},
	}),
);
