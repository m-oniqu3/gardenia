import React from 'react';
import ReactDOM from 'react-dom/client';
import { Routes } from '@generouted/react-router';
import '@client/styles/global.scss';

const root = document.getElementById('root')!;
const app = (
	<React.StrictMode>
		<Routes />
	</React.StrictMode>
);

ReactDOM.createRoot(root).render(app);
