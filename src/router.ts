import { createRouter, createWebHashHistory } from 'vue-router'
import axios from 'axios'
import store from './store'
import Home from './views/HomeView.vue'
import Login from './views/LoginView.vue'
import ColumnDetail from './views/ColumnDetail.vue'
import CreatePost from './views/CreatePost.vue'
import Signup from './views/Signup.vue'
const routerHistory = createWebHashHistory()
const routes = [
    {
        name: 'home',
        path: '/',
        component: Home
    },
    {
        name: 'login',
        path: '/login',
        component: Login,
        meta: { redirectAlreadyLogin: true } // 已登陆的，重定向
    },
    {
        name: 'signup',
        path: '/signup',
        component: Signup,
        meta: { redirectAlreadyLogin: true } // 已登陆的，重定向
    },
    {
        name: 'column',
        path: '/column/:id',
        component: ColumnDetail
    },
    {
        name: 'create',
        path: '/create',
        component: CreatePost,
        meta: { requiredLogin: true } // 登录才能访问
    }
]
const router = createRouter({
    history: routerHistory,
    routes
})

// 判断是否有权限访问页面
router.beforeEach((to, from, next) => {
    const { user, token } = store.state
    const { requiredLogin, redirectAlreadyLogin } = to.meta
   if (!user.isLogin) {
    if (token) {
        axios.defaults.headers.common.Authorization = `Bearer ${token}`
        store.dispatch('fetchCurrentUser').then(() => {
            if (redirectAlreadyLogin) {
                next('/')
            } else {
                next()
            }
        }).catch((e) => {
            console.error(e)
            store.commit('logout')
            next('login')
        })
    } else {
        if (requiredLogin) {
            next('login')
        } else {
            next()
        }
    }
   } else {
    if (redirectAlreadyLogin) {
        next('/')
    } else {
        next()
    }
   }
})
export default router
