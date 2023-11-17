<script lang="ts">
import { useAuth } from '@client/stores/auth'
import { useNotifications } from '@client/stores/notification'
import { assign } from '@sa-net/utils'
import { isAxiosError } from 'axios'
import { computed, defineComponent, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useRoute } from 'vue-router/auto'

export default defineComponent({
	name: 'LoginPage',
})
</script>

<script setup lang="ts">
const auth = useAuth()
const notification = useNotifications()
const router = useRouter()
const route = useRoute()

const redirect = computed<string>(() => (route.query.redirect as any) ?? '/')

const creds = reactive({
	username: '',
	password: '',
})

const loading = ref(false)

async function login() {
	try {
		loading.value = true
		await auth.login(creds)
		router.push(redirect.value)
	} catch (error) {
		let body = ''

		if (isAxiosError(error)) {
			body = error.response?.data.message ?? error.message
		} else {
			body = 'Something went wrong. Please try again.'
		}

		notification.push({ type: 'error', title: 'Login Failed', body })
	} finally {
		loading.value = false
		assign(creds, { username: '', password: '' })
	}
}
</script>

<template>
	<Page class="login-page">
		<NavigationLogo />

		<form
			class="login-form"
			@submit.prevent="login"
		>
			<header>
				<Heading
					type="small"
					color="primary"
				>
					Log In
				</Heading>

				<p class="welcome-text">
					Welcome back to Gardenia! Login to your account to continue.
				</p>
			</header>

			<InputField
				name="username"
				label="Username"
				:hide-label="true"
				v-model="creds.username"
			/>

			<InputField
				name="password"
				label="Password"
				type="password"
				:hide-label="true"
				v-model="creds.password"
			/>

			<Button
				type="submit"
				color="primary"
				:disabled="loading"
			>
				<BaseSpinner v-if="loading" />
				<template v-else>Login</template>
			</Button>
		</form>

		<figure class="image">
			<img
				src="@/assets/plant-grid-login.png"
				alt="Plant Grid"
			/>
		</figure>
	</Page>
</template>

<style lang="scss" scoped>
.login-page {
	display: grid;
	grid-template-columns: 1fr;
	grid-template-rows: 10dvh 1fr;
	grid-template-areas: 'logo image' 'login-form image';

	height: 100vh;

	@include container;
	@include breakpoint(medium) {
		grid-template-columns: 1fr 1fr;
		grid-template-rows: 10dvh 1fr;
		grid-template-areas: 'logo image' 'login-form image';
	}

	.navigation-logo {
		justify-content: flex-start;
		grid-area: logo;
	}

	.login-form {
		@include flex(column);
		gap: 1rem;
		max-width: 280px;
		grid-area: login-form;

		align-self: center;
		justify-self: center;

		.welcome-text {
			@include text;
			margin: 0.5rem 0;
		}

		button {
			margin-top: 1rem;
			width: 100%;
		}
	}
	.image {
		display: none;
		overflow: hidden;
		grid-area: image;

		@include breakpoint(medium) {
			@include flex(row, center, center);

			flex: 50%;
			height: 100%;

			img {
				width: 100%;
				height: 110%;
				object-fit: contain;
			}
		}
	}
}
</style>
