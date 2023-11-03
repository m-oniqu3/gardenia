import React from 'react';
import ReactDOM from 'react-dom/client';
import '@client/styles/global.scss';
import { App } from '@client/App';

const root = document.getElementById('root')!;
const app = <App />;

ReactDOM.createRoot(root).render(app);
