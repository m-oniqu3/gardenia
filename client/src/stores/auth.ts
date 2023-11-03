import { createStore } from '@client/utils/createStore';

export interface AuthState {
	current: string | null;
	update(current: string | null): void;
}

export const useAuth = createStore<AuthState>('auth', {
	current: null,
	update(current: string | null) {
		this.current = current;
	},
});

export default useAuth.Provider;
