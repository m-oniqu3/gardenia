import { Link } from '@client/router';
import styles from './Main.module.scss';
import { useAuth } from '@client/stores/auth';

export default function NavigationMain() {
	const auth = useAuth();

	const authLink = auth.isLoggedIn ? (
		<Link to="/logout">Logout</Link>
	) : (
		<Link to="/login">Login</Link>
	);

	return (
		<nav className={styles.NavigationMain}>
			<div className="branding">
				<h1>App</h1>
			</div>

			<menu>
				<Link to="/">Home</Link>
				{authLink}
			</menu>
		</nav>
	);
}
