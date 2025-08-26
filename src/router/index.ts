import { createWebHistory, createRouter } from 'vue-router'

import Home from '@/pages/home.vue'

const routes = [
    { path: '/', component: Home },
    { path: '/blog-list', name: 'blog-list', component: () => import('@/pages/blog-list.vue') },
]

const router = createRouter({
    // history: createMemoryHistory(),
    history: createWebHistory(),
    routes,
})

export default router
