import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "../views/Login";
import Urls from "../views/Urls";
import Generator from "../views/Generator";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Generator',
        component: Generator,
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
        props: true
    },
    {
        path: '/urls',
        name: 'Urls',
        component: Urls,
        props: true,
        meta: {
            requiresAuth: true
        }
    },
]

const router = new VueRouter({
    routes,
    mode: "history"
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        // this route requires auth, check if logged in
        // if not, redirect to login page.
        const token = localStorage.getItem("token")
        if (!token) {
            next({name: 'Login'})
        } else {
            next() // go to wherever I'm going
        }
    } else {
        next() // does not require auth, make sure to always call next()!
    }
})

export default router
