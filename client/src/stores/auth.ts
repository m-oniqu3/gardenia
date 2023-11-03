import { api } from '@client/api';
import { createStore } from '@client/utils/createStore';
export interface AuthState {
	current: null | string;
	readonly isLoggedIn: boolean;
	fetch(): Promise<void>;
	login(username: string, password: string): Promise<void>;
}

export const [useAuth, AuthContext] = createStore<AuthState>('Auth', {
	current: null,
	get isLoggedIn() {
		return this.current !== null;
	},
	async fetch() {
		const { data } = await api.get('/auth');
		this.current = data;
	},
	async login(username: string, password: string) {
		const { data } = await api.post('/auth', { username, password });
		this.current = data;
	},
});
