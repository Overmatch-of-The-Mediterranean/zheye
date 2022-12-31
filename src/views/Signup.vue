<template>
    <div class="signup-page mx-auto p-3 w-330">
        <h5 class="my-4 text-center">注册者也账户</h5>
        <ValidateForm @form-submit="onFormSubmit">
            <div class="mb-3">
                <label class="form-label">邮箱地址</label>
                <ValidateInput :rules="emailRules" v-model="formData.email" placeholder="请输入邮箱地址" type="text" />
            </div>
            <div class="mb-3">
                <label class="form-label">昵称</label>
                <ValidateInput :rules="nameRules" v-model="formData.nickName" placeholder="请输入昵称" type="text" />
            </div>
            <div class="mb-3">
                <label class="form-label">密码</label>
                <ValidateInput type="password" placeholder="请输入密码" :rules="passwordRules" v-model="formData.password" />
            </div>
            <div class="mb-3">
                <label class="form-label">重复密码</label>
                <ValidateInput type="password" placeholder="请再次密码" :rules="repeatPasswordRules" v-model="formData.repeatPassword" />
            </div>
            <template #submit>
                <button type="submit" class="btn btn-primary btn-block btn-large">注册新用户</button>
            </template>
        </ValidateForm>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import axios from 'axios'
import ValidateInput, { RuleProp } from '@/components/ValidateInput.vue'
import createMessage from '@/components/useCreateMessage'
import ValidateForm from '../components/ValidateForm.vue'
import router from '@/router'
export default defineComponent({
    name: 'Signup',
    components: { ValidateForm, ValidateInput },
    props: {
        disabled: {
            type: Boolean,
            default: false
        }
    },
    setup() {
        const formData = reactive({
            email: '',
            nickName: '',
            password: '',
            repeatPassword: ''
        })
        const emailRules: RuleProp[] = [
            { type: 'required', message: '电子邮箱地址不能为空' },
            { type: 'email', message: '请输入正确的电子邮箱格式' }
        ]
        const nameRules: RuleProp[] = [{ type: 'required', message: '昵称不能为空' }]
        const passwordRules: RuleProp[] = [{ type: 'required', message: '密码不能为空' }]
        const repeatPasswordRules: RuleProp[] = [
            { type: 'required', message: '重复密码不能为空' },
            {
                type: 'custom',
                validator: () => {
                    return formData.password === formData.repeatPassword
                },
                message: '密码不相同'
            }
        ]
        // 提交验证及一些操作
        const onFormSubmit = (value: boolean) => {
            const payLoad = {
                email: formData.email,
                password: formData.password,
                nickName: formData.nickName
            }
            if (value) {
                axios
                    .post('/users/', payLoad)
                    .then(() => {
                        createMessage('注册成功 正在跳转登录页面', 'success')
                        setTimeout(() => {
                            router.push('/login')
                        }, 2000)
                    })
                    .catch(e => {
                        console.log(e)
                    })
            }
        }
        return {
            emailRules,
            nameRules,
            passwordRules,
            repeatPasswordRules,
            formData,
            onFormSubmit
        }
    }
})
</script>

<style>
</style>
