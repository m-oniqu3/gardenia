import Page from '@client/components/Page';
import styles from './login.module.scss';
import { InputField } from '@client/components/InputField';
import Button from '@client/components/Button';
import Form from '@client/components/Form';
import { useAuth } from '@client/stores/auth';
import { ref } from '@client/utils/ref';
import { useNavigate } from '@client/router';

export default function LoginPage() {
	const auth = useAuth();
	const navigate = useNavigate();

	const [username, password] = [ref(''), ref('')];

	async function login() {
		try {
			console.log(username.value);
			await auth.login(username.value, password.value);
			console.log('Logged in');
			navigate('/');
		} catch (error) {
			alert('Invalid username or password');
		}
	}

	return (
		<Page className={styles.LoginPage}>
			<Form onSubmit={login}>
				<InputField
					id="username"
					label="Username"
					value={username}
				/>
				<InputField
					id="password"
					label="Password"
					type="password"
					value={password}
				/>
				<Button type="submit">Login</Button>
			</Form>
		</Page>
	);
}
