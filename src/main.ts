import { createApp } from 'vue'
import axios from 'axios'

import App from './App.vue'
import router from './router'
import store from './store'
axios.defaults.baseURL = 'xxx'
axios.interceptors.request.use(config => {
    config.params = { ...config.params, icode: 'xxx' }
    return config
})

// 请求拦截器，每次请求改变状态，显示loading
axios.interceptors.request.use(config => {
    store.commit('setLoading', true)
    return config
})

// 响应拦截器，每次响应改变状态，销毁loading
axios.interceptors.response.use(config => {
    setTimeout(() => {
        store.commit('setLoading', false)
    }, 2000)

    return config
})
axios.get('/column', { params: { key: '111' } })
const app = createApp(App)
app.use(router).use(store)
app.mount('#app')
