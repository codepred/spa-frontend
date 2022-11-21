import { createRouter, createWebHistory} from 'vue-router'
import Cardadd from '../components/Card-add.vue'
import Viewlist from '../components/View-list.vue'
import Mainview from '../components/Main-view.vue'
import Login from '../components/Log-in.vue'
import Createuser from '../components/Create-user.vue'
import Checkout from '../components/Check-out.vue'
import Rooms from '../components/Rooms-list.vue'
import Treatments from '../components/Treatments-list.vue'

const routes = [
    {
        path: '/',
        redirect: '/create-user'
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
    },
    {
        path: '/create-user',
        name: 'Createuser',
        component: Createuser
    },
    {
        path: '/check-out',
        name: 'Checkout',
        component: Checkout
    },
    {
        path: '/rooms-list',
        name: 'Rooms',
        component: Rooms
    },
    {
        path: '/treatments-list',
        name: 'Treatments',
        component: Treatments
    }
]


const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})



export default router