import React from 'react';
import ReactDOM from 'react-dom/client';
import '@client/styles/global.scss';
import { App } from '@client/App';

const root = document.getElementById('root')!;
const app = (
	<React.StrictMode>
		<App />
	</React.StrictMode>
);

ReactDOM.createRoot(root).render(app);
