import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Home.vue'
import DetailView from '../views/Detail.vue'
import TipOffView from '../views/TipOff.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
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
            path: '/tipoff',
            name: 'TipOff',
            component: TipOffView
        },
        {
            path: "/404",
            name: "notFound",
            component: HomeView,
        },
        {
            path: "/:(.*)*",
            component: HomeView,
        },
    ]
})

export default router
