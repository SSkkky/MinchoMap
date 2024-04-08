import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/App.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/Detail',
        name: 'Detail',
        component: () => import('../views/Detail.vue')
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
