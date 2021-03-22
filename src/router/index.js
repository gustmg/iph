import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import MapView from '../views/Map.vue'
import Vinculo from '../views/Vinculo.vue'
import Login from '../views/Login.vue'
import store from '../store/index.js'
import { publicPath } from '../../vue.config'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
    },
    {
        path: '/map',
        name: 'map',
        component: MapView,
    },
    {
        path: '/vinculo',
        name: 'vinculo',
        component: Vinculo,
    },
    // {
    //     path: '*',
    //     component: PageNotFound,
    //     name: '404',
    // },
]

const router = new VueRouter({
    mode: 'history',
    base: publicPath,
    routes,
})

router.beforeEach((to, from, next) => {
    if (to.name !== 'Login' && store.state.token.length == 0) {
        // next({ name: 'Login' })
        next()
    } else next()
})

export default router
