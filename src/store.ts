import { createStore } from 'vuex'
import { testData, testPosts, ColumnProps, PostProps } from './testData'

export interface UserProps{
    isLogin:boolean,
    name?:string,
    id?:number,
    columnId?:number
}
export interface GlobalProps {
    columns:ColumnProps[],
    posts:PostProps[],
    user:UserProps
}

const state:GlobalProps = {
    columns: testData,
    posts: testPosts,
    user: {
        isLogin: false
    }
}

const mutations = {
    login(state:GlobalProps) {
        state.user = { ...state.user, isLogin: true, name: 'viking', columnId: 1 }
    },
    createPost(state:GlobalProps, newPost:any) {
        state.posts.push(newPost)
    }
}

const getters = {
    // 获取专栏数据
    getColumnsById: (state:GlobalProps) => (id:number) => {
        return state.columns.find(column => column.id === id)
    },
    // 获取文章数据
    getPostsByCid: (state:GlobalProps) => (cid:number) => {
        return state.posts.filter(post => post.columnId === cid)
    }
}
const store = createStore({
    state,
    mutations,
    getters
})

export default store
