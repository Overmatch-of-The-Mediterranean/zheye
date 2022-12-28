<template>
    <div class="container">
        <!-- 头部 -->
        <GlobalHeader :user="CurrentUser" />
        <!-- 登录列表 -->
        <ValidateForm @FormSubmit="onFormSubmit">
            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">邮箱地址</label>
                <ValidateInput ref="inputRef" v-model="emailVal" :rules="emailRules" placeholder="请输入邮箱" />
                {{emailVal}}
            </div>
            <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">密码</label>
                <ValidateInput type="password" :rules="passWordRules" placeholder="请输入密码" v-model="passWordVal" />
            </div>
            <template #submit>
                <span class="btn btn-primary">提交</span>
            </template>
        </ValidateForm>
        <!-- 专栏 -->
        <ColumnList :list="list" />
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import ColumnList, { ColumnProps } from './components/ColumnList.vue'
import GlobalHeader, { UserProps } from './components/GlobalHeader.vue'
import ValidateInput, { RuleProp } from './components/ValidateInput.vue'
import ValidateForm from './components/ValidateForm.vue'
import 'bootstrap/dist/css/bootstrap.min.css'
export default defineComponent({
    name: 'App',
    components: {
        ColumnList,
        GlobalHeader,
        ValidateInput,
        ValidateForm
    },
    setup() {
        const emailVal = ref('')
        const passWordVal = ref('')
        // 邮箱验证规则
        const emailRules: RuleProp[] = [
            { type: 'required', message: '电子邮箱地址不能为空' },
            { type: 'email', message: '请输入正确的电子邮箱格式' }
        ]
        // 密码验证规则
        const passWordRules: RuleProp[] = [
            { type: 'required', message: '密码不能为空' },
            { type: 'passWord', message: '请输入正确的密码格式' }
        ]
        // 专栏测试数据
        const testList: ColumnProps[] = [
            {
                id: 1,
                title: 'test1的专栏',
                description: '这是的test1专栏，有一段非常有意思的简介，可以更新一下欧',
                avatar: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_100,w_100'
            },
            {
                id: 2,
                title: 'test2的专栏',
                description: '这是的test2专栏，有一段非常有意思的简介，可以更新一下欧',
                avatar: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_100,w_100'
            },
            {
                id: 3,
                title: 'test3的专栏',
                description: '这是的test3专栏，有一段非常有意思的简介，可以更新一下欧'
                // avatar: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_100,w_100'
            },
            {
                id: 4,
                title: 'test4的专栏',
                description: '这是的test4专栏，有一段非常有意思的简介，可以更新一下欧',
                avatar: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_100,w_100'
            }
        ]
        // 获取ValidateInput组件
        const inputRef = ref<any>()
        const CurrentUser: UserProps = {
            isLogin: true,
            name: 'hhh'
        }
        // 提交表单后，后续的操作
        const onFormSubmit = (value: boolean) => {
            console.log(inputRef.value.validateInput())

            console.log(1234, value)
        }
        return {
            list: testList,
            CurrentUser,
            emailRules,
            emailVal,
            passWordRules,
            passWordVal,
            onFormSubmit,
            inputRef
        }
    }
})
</script>

<style>
</style>
