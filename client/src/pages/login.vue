<script lang="ts">
import { useAuth } from '@client/stores/auth'
import { isAxiosError } from 'axios'
import { computed, defineComponent, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useRoute } from 'vue-router/auto'

export default defineComponent({
	name: 'LoginPage',
})
</script>

<script setup lang="ts">
const auth = useAuth()
const router = useRouter()
const route = useRoute()

const redirect = computed<string>(() => (route.query.redirect as any) ?? '/')

const creds = reactive({
	username: '',
	password: '',
})

async function login() {
	try {
		await auth.login(creds)
		router.push(redirect.value)
	} catch (error) {
		if (isAxiosError(error)) {
			alert(error.response?.data.message ?? error.message)
		} else alert('An error occurred')
	}
}
</script>

<template>
	<Container class="login-page">
		<form @submit.prevent="login">
			<h1>Login</h1>

			<InputField
				id="username"
				label="Username"
				v-model="creds.username"
			/>

			<InputField
				id="password"
				label="Password"
				type="password"
				v-model="creds.password"
			/>

			<Button type="submit">Login</Button>
		</form>
	</Container>
</template>

<style lang="scss" scoped>
.login-page {
	@include flex(column, center, center);

	form {
		@include flex(column);
		gap: 1em;
	}
}
</style>
