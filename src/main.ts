import { createApp } from 'vue'
import App from './App.vue'
import store from './store/store'
import router from './router'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';


declare global {
    interface Window {
        Kakao: any;
    }
}

createApp(App).use(store).use(router).use(Antd).mount('#app')