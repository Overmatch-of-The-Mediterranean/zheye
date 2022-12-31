<template>
    <nav class="navbar navbar-dark bg-primary justify-content-between mb-4 px-4">
        <router-link :to="{name:'home'}" class="navbar-brand">者也专栏</router-link>
        <ul v-if="!user.isLogin" class="list-inline mb0">
            <li class="list-inline-item">
                <router-link :to="{name:'login'}" href="#" class="btn btn-outline-light my2">登录</router-link>
            </li>
            <li class="list-inline-item">
                <router-link :to="{name:'signup'}" href="#" class="btn btn-outline-light my2">注册</router-link>
            </li>
        </ul>
        <ul v-else class="list-inline mb0">
            <li class="list-inline-item">
                <DropDown :title="`你好！${user.nickName}`">
                    <DropDownItem>
                        <router-link :to="{name:'create'}" class="dropdown-item">新建文章</router-link>
                    </DropDownItem>
                    <DropDownItem disabled><a href="#" class="dropdown-item">编辑资料</a></DropDownItem>
                    <DropDownItem><a href="#" class="dropdown-item">退出登录</a></DropDownItem>
                </DropDown>
            </li>
        </ul>

    </nav>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import DropDown from './DropDown.vue'
import DropDownItem from './DropDownItem.vue'
import { UserProps } from '../store'
export default defineComponent({
    name: 'GlobalHeader',
    components: {
        DropDown,
        DropDownItem
    },
    props: {
        user: {
            type: Object as PropType<UserProps>,
            required: true
        }
    }
})
</script>

<style></style>
