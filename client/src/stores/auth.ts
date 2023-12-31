import { api } from '@client/plugins/api'
import { LoginCreds, UserData } from '@gardenia/shared'
import { isNull } from '@sa-net/utils'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useAuth = defineStore('auth', () => {
	const current = ref<UserData | null>(null)
	const isLoggedIn = computed(() => !isNull(current.value))

	async function fetch() {
		const { data } = await api.get('auth')
		current.value = data
	}

	async function login(creds: LoginCreds) {
		const { data } = await api.post('auth', creds)
		current.value = data
	}

	async function logout() {
		current.value = null
		await api.delete('auth')
	}

	return {
		current,
		isLoggedIn,
		fetch,
		login,
		logout,
	}
})
