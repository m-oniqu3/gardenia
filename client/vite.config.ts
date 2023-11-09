import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueRouter from 'unplugin-vue-router/vite'
import Components from 'unplugin-vue-components/vite'

// https://vitejs.dev/config/
export default defineConfig(env => {
	const envars = loadEnv(env.mode, '../', ['SERVER_', 'CLIENT_'])

	const serverURL = new URL(envars.SERVER_URL ?? 'http://localhost:3001')
	const serverAPIPath = envars.SERVER_API_PATH ?? '/api'

	const clientURL = new URL(envars.CLIENT_URL ?? 'http://localhost:3000')

	return {
		envDir: '../',
		envPrefix: 'CLIENT_',

		define: {
			__API_PATH__: JSON.stringify(serverAPIPath),
		},

		resolve: {
			alias: {
				'@client': new URL('./src', import.meta.url).pathname,
			},
		},

		css: {
			preprocessorOptions: {
				scss: {
					additionalData: '@import "sassy";',
					includePaths: ['src/styles'],
				},
			},
		},

		server: {
			port: parseInt(clientURL.port),
			proxy: {
				[serverAPIPath]: serverURL.origin,
			},
		},

		build: {
			outDir: '../dist/client',
			emptyOutDir: true,
		},

		plugins: [
			vue(),
			VueRouter({
				dts: './src/types/router.d.ts',
			}),
			Components({
				directoryAsNamespace: true,
				dts: './src/types/components.d.ts',
			}),
		],
	}
})
