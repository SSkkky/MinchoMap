import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/Home.vue'
import DetailView from '../views/Detail.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: HomeView
    },
    {
        path: '/detail/:id',
        name: 'Detail',
        component: DetailView
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
