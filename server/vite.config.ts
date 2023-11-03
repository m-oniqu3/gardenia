import { defineConfig } from 'vite';
import { VitePluginNode } from 'vite-plugin-node';

export default defineConfig({
	envDir: '../',
	envPrefix: ['SERVER_', 'CLIENT_'],

	resolve: {
		alias: {
			'@server': new URL('./src', import.meta.url).pathname,
		},
	},

	build: {
		outDir: '../dist',
		emptyOutDir: true,
	},

	plugins: VitePluginNode({
		appPath: './src/main.ts',
		// is not used since we are using vite-node to run the server during development
		adapter: 'express',
	}),
});
