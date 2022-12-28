<template>
    <nav class="navbar navbar-dark bg-primary justify-content-between mb-4 px-4">
        <a class="navbar-brand" href="#">者也专栏</a>
        <ul v-if="!user.isLogin" class="list-inline mb0">
            <li class="list-inline-item">
                <a href="#" class="btn btn-outline-light my2">登录</a>
            </li>
            <li class="list-inline-item">
                <a href="#" class="btn btn-outline-light my2">注册</a>
            </li>
        </ul>
        <ul v-else class="list-inline mb0">
            <li class="list-inline-item">
                <DropDown :title="`你好！${user.name}`">
                    <DropDownItem><a href="#" class="dropdown-item">新建文章</a></DropDownItem>
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
export interface UserProps {
    isLogin: boolean
    name?: string
    id?: string
}
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

<style lang="scss"></style>
