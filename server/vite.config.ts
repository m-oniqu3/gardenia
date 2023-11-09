import { defineConfig } from 'vite'
import { VitePluginNode } from 'vite-plugin-node'

export default defineConfig({
	envDir: '../',
	envPrefix: ['SERVER_', 'CLIENT_'],

	publicDir: false,
	build: {
		outDir: '../dist',
		emptyOutDir: true,
	},

	resolve: {
		alias: {
			'@server': new URL('./src', import.meta.url).pathname,
		},
	},

	plugins: VitePluginNode({
		appPath: './src/main.ts',
		// not used since we are using vite-node during development. Value does not matter.
		adapter: 'express',
	}),
})
