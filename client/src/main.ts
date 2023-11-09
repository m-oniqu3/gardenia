import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router/auto'
import App from './App.vue'

const pinia = createPinia()
const router = createRouter({
	history: createWebHistory(),
})

createApp(App).use(router).use(pinia).mount('#app')
