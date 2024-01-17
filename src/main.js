import { createApp } from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import router from './router/router'
import '@/assets/css/main.css'
import './registerServiceWorker'


window.CLIENT_API_BASE_URL = 'http://54.37.234.76:8081/'

const app = createApp(App)
app.use(router)
app.mount('#app')