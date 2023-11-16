import { defineStore } from 'pinia'
import { reactive } from 'vue'

export interface Notification {
	type: 'error' | 'success' | 'warning' | 'info'
	title: string
	body: string
	duration?: number
}

export const useNotifications = defineStore('notification', () => {
	const items = reactive(new Set<Notification>())

	function push(item: Notification) {
		if (!item.duration) {
			item.duration = 5000
		}
		items.add(item)

		return () => items.delete(item)
	}

	return { items, push }
})
