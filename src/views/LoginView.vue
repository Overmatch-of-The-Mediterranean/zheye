<template>
    <div class="container">
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
                <button type="submit" class="btn btn-primary">提交</button>
            </template>
        </ValidateForm>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import ValidateInput, { RuleProp } from '../components/ValidateInput.vue'
import ValidateForm from '../components/ValidateForm.vue'
import 'bootstrap/dist/css/bootstrap.min.css'
export default defineComponent({
    name: 'LoginView',
    components: {
        ValidateInput,
        ValidateForm
    },
    setup() {
        const store = useStore()
        const router = useRouter()
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
        // 获取ValidateInput组件
        const inputRef = ref<any>()
        console.log(store.state.user)
        // 提交表单后，后续的操作
        const onFormSubmit = (value: boolean) => {
            if (value) {
                const payLoad = {
                    email: emailVal.value,
                    passWord: passWordVal.value
                }
                store.dispatch('loginAndFetch', payLoad).then(() => {
                    router.push('/')
                })
            }
        }
        return {
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
