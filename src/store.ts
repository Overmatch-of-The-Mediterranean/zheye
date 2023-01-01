import { createStore, Commit, Dispatch } from 'vuex'
import axios from 'axios'

export interface UserProps{
    isLogin:boolean,
    nickName?:string,
    _id?:string,
    column?:string,
    email?:string
}
export interface ResponseType<P> {
    code:number,
    msg:string,
    data:P
}
export interface ImageProps {
    _id?:string,
    url?:string,
    createAt?:string,
    fitUrl?: string;
}
export interface ColumnProps {
    _id: string;
    title: string;
    avatar?: ImageProps;
    description: string;
  }
  export interface PostProps {
    _id: string;
    title: string;
    excerpt?:string
    content?: string;
    image?: ImageProps | string; // 对于PostList组件有些问题
    createdAt: string;
    column: string;
    author?:string
  }
  export interface GlobalErrorProps{
    status:boolean,
    message?:string
  }
export interface GlobalProps {
    error:GlobalErrorProps,
    token:string,
    loading:boolean,
    columns:ColumnProps[],
    posts:PostProps[],
    user:UserProps
}

const getAndCommit = async(url:string, mutationName:string, commit:Commit) => {
    const { data } = await axios.get(url)
    commit(mutationName, data)
    return data
}
const postAndCommit = async(url:string, mutationName:string, commit:Commit, payLoad:any) => {
    const { data } = await axios.post(url, payLoad)
    commit(mutationName, data)
    return data
}
const state:GlobalProps = {
    error: {
        status: false
    },
    token: '',
    loading: false,
    columns: [],
    posts: [],
    user: {
        isLogin: false
    }
}

const mutations = {
    createPost(state:GlobalProps, newPost:any) {
        state.posts.push(newPost)
    },
    fetchColumns(state:GlobalProps, res:any) {
        state.columns = res.data
        console.log('res===>', res.data)
    },
    fetchColumn(state:GlobalProps, res:any) {
        state.columns = [res.data]
    },
    fetchPosts(state:GlobalProps, res:any) {
        state.posts = res.data.list
    },
    setLoading(state:GlobalProps, status:boolean) {
        state.loading = status
    },
    login(state:GlobalProps, res:any) {
        state.token = res.data.token
        axios.defaults.headers.common.Authorization = `Bearer ${state.token}`
        return res
    },
    fetchCurrentUser(state:GlobalProps, rowData:any) {
        state.user = { isLogin: true, ...rowData.data }
    },
    setError(state:GlobalProps, e:GlobalErrorProps) {
        state.error = e
    },
    logout(state:GlobalProps) {
        state.token = ''
        localStorage.removeItem('token')
        delete axios.defaults.headers.common.Authorization
    }
}

const actions = {
    fetchColumns({ commit }:{commit:Commit}) {
        return getAndCommit('/column', 'fetchColumns', commit)
    },
    fetchColumn({ commit }:{commit:Commit}, cid:string) {
        return getAndCommit(`/column/${cid}`, 'fetchColumn', commit)
    },
    fetchPosts({ commit }:{commit:Commit}, cid:string) {
        return getAndCommit(`/column/${cid}/posts`, 'fetchPosts', commit)
    },
    fetchCurrentUser({ commit }:{commit:Commit}) {
        return getAndCommit('/login/current', 'fetchCurrentUser', commit)
    },
    login({ commit }:{commit:Commit}, payLoad:any) {
        postAndCommit('/user/login', 'login', commit, payLoad)
    },
    createPost({ commit }:{commit:Commit}, payLoad:any) {
        postAndCommit('/posts', 'createPost', commit, payLoad)
    },
    loginAndFetch({ dispatch }:{dispatch:Dispatch}, payLoad:any) {
        // 登录获取token并设置headers
        return dispatch('login', payLoad).then(() => {
            // 存储用户信息用于展示
            return dispatch('fetchCurrentUser')
        })
    }
}
const getters = {
    // 获取专栏数据
    getColumnsById: (state:GlobalProps) => (id:string) => {
        return state.columns.find(column => column._id === id)
    },
    // 获取文章数据
    getPostsByCid: (state:GlobalProps) => (cid:string) => {
        return state.posts.filter(post => post.column === cid)
    }
}
const store = createStore({
    state,
    mutations,
    getters,
    actions
})

export default store
