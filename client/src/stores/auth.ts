import { api } from '@client/api';
import { createStore } from '@client/utils/createStore';

export const [useAuth, AuthContext] = createStore('Auth', () => ({
	current: null as string | null,
	get isLoggedIn() {
		return this.current !== null;
	},
	async fetch() {
		const { data } = await api.get('/auth');
		this.current = data;
	},
}));
