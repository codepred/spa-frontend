import { createRouter, createWebHistory} from 'vue-router'
import Mainview from '../components/Main-view.vue'
import ProfileView from '../components/Profile-tab.vue'
import Login from '../components/Log-in.vue'
import Signup from '../components/Sign-up.vue'
import Checkout from '../components/Check-out.vue'
import Treatments from '../components/Treatments-list.vue'

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
        path: '/profile',
        name: 'ProfileView',
        component: ProfileView
    },
    {
        path: '/log-in',
        name: 'Login',
        component: Login
    },
    {
        path: '/sign-up',
        name: 'Signup',
        component: Signup
    },
    {
        path: '/check-out',
        name: 'Checkout',
        component: Checkout
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