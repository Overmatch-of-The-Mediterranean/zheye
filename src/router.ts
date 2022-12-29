import { createRouter, createWebHashHistory } from 'vue-router'
import store from './store'
import Home from './views/HomeView.vue'
import Login from './views/LoginView.vue'
import ColumnDetail from './views/ColumnDetail.vue'
import CreatePost from './views/CreatePost.vue'
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
        name: 'column',
        path: '/column/:id',
        component: ColumnDetail,
        meta: { requiredLogin: true }
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
    if (to.meta.requiredLogin && !store.state.user.isLogin) {
        next({ name: 'login' })
    } else if (to.meta.redirectAlreadyLogin && store.state.user.isLogin) {
        next({ name: 'home' })
    } else {
        next()
    }
})
export default router
