import { api } from '@client/plugins/api'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuth = defineStore('auth', () => {
	const current = ref<string | null>(null)

	async function fetch() {
		const { data } = await api.get('auth')
		current.value = data
	}

	async function login(username: string, password: string) {
		const { data } = await api.post('auth', { username, password })
		current.value = data
	}

	async function logout() {
		current.value = null
		await api.delete('auth')
	}

	return {
		current,
		fetch,
		login,
		logout,
	}
})
