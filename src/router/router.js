import { createRouter, createWebHistory} from 'vue-router'
import Login from '../components/Log-in.vue'
import Cardemployeeview from '../components/Card-employee-view.vue'
import Cardhostview from '../components/Card-host-view.vue'
import Cardadd from '../components/Card-add.vue'
import Hostview from '../components/Host-view.vue'
import Mainview from '../components/Main-view.vue'

const routes = [
    {
        path: '/',
        redirect: '/main'
    },
    {
        path: '/main',
        name: 'Mainview',
        component: Mainview
    },
    {
        path: '/log-in',
        name: 'Login',
        component: Login
    },
    {
        path: '/card-employee-view',
        name: 'Cardemployeeview',
        component: Cardemployeeview
    },
    {
        path: '/card-host-view',
        name: 'Cardhostview',
        component: Cardhostview
    },
    {
        path: '/card-add',
        name: 'Cardadd',
        component: Cardadd
    },
    {
        path: '/host-view',
        name: 'Hostview',
        component: Hostview
    }
]


const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})



export default router