import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import generouted from '@generouted/react-router/plugin';

// https://vitejs.dev/config/
export default defineConfig({
	envDir: '../',
	envPrefix: ['CLIENT_'],

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

	plugins: [react(), generouted()],
});
