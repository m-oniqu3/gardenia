/// <reference path="@sa-net/utils" />
/// <reference path="'@gardenia/shared'" />

declare const __API_PATH__: string

declare module '*.vue' {
	import type { DefineComponent } from 'vue'
	const component: DefineComponent<{}, {}, any>
	export default component
}
