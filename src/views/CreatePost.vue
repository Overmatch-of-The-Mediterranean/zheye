<template>
    <div class="create-post-page">
        <h4>新建文章</h4>
        <validate-form @form-submit="onFormSubmit">
            <div class="mb-3">
                <label class="form-label">文章标题：</label>
                <validate-input :rules="titleRules" v-model="titleVal" placeholder="请输入文章标题" type="text" />
            </div>
            <div class="mb-3">
                <label class="form-label">文章详情：</label>
                <validate-input rows="10" tag="textarea" placeholder="请输入文章详情" :rules="contentRules" v-model="contentVal" />
            </div>
            <template #submit>
                <button class="btn btn-primary btn-large"> 发表文章</button>
            </template>
        </validate-form>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { GlobalProps } from '@/store'
import { PostProps } from '@/testData'
import ValidateInput, { RulesProp } from '../components/ValidateInput.vue'
import ValidateForm from '../components/ValidateForm.vue'

export default defineComponent({
    name: 'CreatePost',
    components: { ValidateInput, ValidateForm },
    props: {
        disabled: {
            type: Boolean,
            default: false
        }
    },
    setup() {
        const store = useStore<GlobalProps>()
        const router = useRouter()
        // 标题
        const titleVal = ref<any>('')
        // 内容
        const contentVal = ref<any>('')
        // 验证规则
        const titleRules: RulesProp = [{ type: 'required', message: '文章标题不能为空' }]
        const contentRules: RulesProp = [{ type: 'required', message: '文章详情不能为空' }]
        // 提交后，创建文章并跳转到column/:id页面
        const onFormSubmit = (value: boolean) => {
            if (value) {
                const { columnId } = store.state.user
                if (columnId) {
                    const newPost: PostProps = {
                        id: new Date().getTime(),
                        title: titleVal,
                        content: contentVal,
                        createdAt: new Date().toLocaleString(),
                        columnId: columnId
                    }
                    store.commit('createPost', newPost)
                    router.push({ name: 'column', params: { id: columnId } })
                }
            }
        }
        return {
            titleRules,
            contentRules,
            titleVal,
            contentVal,
            onFormSubmit
        }
    }
})
</script>

<style>
</style>
