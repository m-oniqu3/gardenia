import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import generouted from '@generouted/react-router/plugin';

// https://vitejs.dev/config/
export default defineConfig(env => {
	const envars = loadEnv(env.mode, '../', ['SERVER_', 'CLIENT_']);

	const clientURL = new URL(envars.CLIENT_URL);
	const serverURL = new URL(envars.SERVER_URL);

	return {
		envDir: '../',
		envPrefix: ['CLIENT_'],

		define: {
			__API_URL__: JSON.stringify(envars.SERVER_API_PATH),
		},

		resolve: {
			alias: {
				'@client': new URL('./src', import.meta.url).pathname,
			},
		},

		css: {
			modules: {
				localsConvention: 'camelCase',
			},
			preprocessorOptions: {
				scss: {
					additionalData: '@import "sassy";',
					includePaths: ['src/styles'],
				},
			},
		},

		build: {
			outDir: '../dist/client',
			emptyOutDir: true,
		},

		server: {
			port: parseInt(clientURL.port),
			proxy: {
				[envars.SERVER_API_PATH]: {
					target: serverURL.href,
				},
			},
		},

		plugins: [react(), generouted()],
	};
});
