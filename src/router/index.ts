import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Home.vue'
import DetailView from '../views/Detail.vue'
import TipOffView from '../views/TipOff.vue'
import OauthView from '../views/Oauth.vue'
import MyPageView from '../views/MyPage.vue'
import AdminView from '../views/Admin.vue'

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
            path: '/oauth',
            name: 'Oauth',
            component: OauthView
        },
        {
            path: '/tipoff',
            name: 'TipOff',
            component: TipOffView
        },
        {
            path: '/mypage',
            name: 'MyPage',
            component: MyPageView
        },
        {
            path: '/adminadminadmin',
            name: 'Admin',
            component: AdminView
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
