<script lang="ts">
import { useAuth } from '@client/stores/auth'
import { isAxiosError } from 'axios'
import type { Ref } from 'vue'
import { computed, defineComponent, reactive, ref } from 'vue'
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
const errorMessage: Ref<string> = ref('')

function clearError() {
	if (errorMessage.value) errorMessage.value = ''
}

async function login() {
	try {
		await auth.login(creds)
		router.push(redirect.value)
	} catch (error) {
		if (isAxiosError(error)) {
			errorMessage.value = error.response?.data.message ?? error.message
		} else {
			errorMessage.value = 'Failed to login. An error occurred.'
		}
	}
}
</script>

<template>
	<LayoutDefault :show-button="false">
		<Page class="login-page">
			<div class="login-form">
				<form
					@submit.prevent="login"
					@input="clearError"
				>
					<header>
						<Heading
							type="small"
							color="primary"
						>
							Log In
						</Heading>
						<p>Welcome back to Gardenia! Login to your account to continue.</p>

						<p class="error">
							{{ errorMessage }}
						</p>
					</header>

					<InputField
						id="username"
						label="Username"
						:hide-label="true"
						v-model="creds.username"
					/>

					<InputField
						id="password"
						label="Password"
						type="password"
						:hide-label="true"
						v-model="creds.password"
					/>

					<Button
						type="submit"
						color="primary"
						>Login</Button
					>
				</form>
			</div>
			<div class="image">
				<figure>
					<img
						src="./../assets/plant-grid-login.png"
						alt=" Plant Grid
				"
					/>
				</figure>
			</div>
		</Page>
	</LayoutDefault>
</template>

<style lang="scss" scoped>
.login-page {
	height: 90dvh;

	@include flex(column, center, center);
	@include container;

	@include breakpoint(medium) {
		display: grid;
		grid-template-columns: 40% 50%;
		justify-content: space-between;
	}

	.login-form {
		@include flex(row, center, center);
		height: 100%;

		form {
			@include flex(column);
			gap: 1rem;
			max-width: 280px;

			header {
				p {
					@include text;
					margin: 0.5rem 0;
				}

				.error {
					height: 1.2rem;

					font-weight: 600;
					color: var(--error);
				}
			}

			button {
				margin-top: 1rem;
				width: 100%;
			}
		}
	}
	.image {
		display: none;
		overflow: hidden;

		@include breakpoint(medium) {
			@include flex(row, center, center);

			position: absolute;
			top: 0px;
			right: 0px;
			width: 50%;
			height: 100%;

			figure {
				width: 70%;
				height: 100%;

				img {
					width: 100%;
					height: 100%;
					transform: scale(1.2);
					object-fit: contain;
				}
			}
		}
	}
}
</style>
