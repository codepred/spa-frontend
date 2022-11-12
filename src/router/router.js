import { createRouter, createWebHistory} from 'vue-router'
import Cardadd from '../components/Card-add.vue'
import Viewlist from '../components/View-list.vue'
import Mainview from '../components/Main-view.vue'
import Login from '../components/Log-in.vue'


const routes = [
    {
        path: '/',
        redirect: '/log-in'
    },
    {
        path: '/main',
        name: 'Mainview',
        component: Mainview
    },
    {
        path: '/card-add',
        name: 'Cardadd',
        component: Cardadd
    },
    {
        path: '/view-list',
        name: 'Viewlist',
        component: Viewlist
    },
    {
        path: '/log-in',
        name: 'Login',
        component: Login
    }
]


const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})



export default router