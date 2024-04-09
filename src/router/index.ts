import { createRouter, createWebHistory } from 'vue-router'
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
    },
    {
        path: "/404",
        name: "notFound",
        component: HomeView,
    },
    {
        path: "/:pathMatch(.*)*",
        redirect: "/404",
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
