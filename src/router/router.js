import { createRouter, createWebHistory} from 'vue-router'
import Mainview from '../components/Main-view.vue'
import Login from '../components/Log-in.vue'
import Createuser from '../components/Create-user.vue'
import Checkout from '../components/Check-out.vue'
import Books from '../components/Book-list.vue'

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
        path: '/book-list',
        name: 'Books',
        component: Books
    },
]


const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})



export default router