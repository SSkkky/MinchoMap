import { createApp } from 'vue'
import App from './views/App.vue'
import store from './store/store'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

createApp(App).use(store).mount('#app')