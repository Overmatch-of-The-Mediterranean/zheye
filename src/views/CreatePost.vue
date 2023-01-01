<template>
    <div class="create-post-page">
        <h4>新建文章</h4>
        <Uploader action="111" @file-uploaded="handleFileUploaded" :beforeUpload="uploadCheck" class="d-flex align-items-center justify-content-center bg-light text-secondary w-100 my-4">
            <h2>点击上传</h2>
            <template #loading>
                <div class="d-flex">
                    <div class="spinner-border text-secondary" role="status">
                        <span class="sr-only"></span>
                    </div>
                    <h2>正在上传</h2>
                </div>
            </template>
            <template #uploaded="dataProps">
                <img :src="dataProps.uploadedData.data.url" alt="">
            </template>
        </Uploader>
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
import { GlobalProps, PostProps, ResponseType, ImageProps } from '@/store'
import Uploader from '@/components/Uploader.vue'

import ValidateInput, { RulesProp } from '../components/ValidateInput.vue'
import ValidateForm from '../components/ValidateForm.vue'
import beforeUploadedCheck from '../helper'
import createMessage from '@/components/useCreateMessage'

export default defineComponent({
    name: 'CreatePost',
    components: { ValidateInput, ValidateForm, Uploader },
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
        let imageId = ''
        // 内容
        const contentVal = ref<any>('')
        // 验证规则
        const titleRules: RulesProp = [{ type: 'required', message: '文章标题不能为空' }]
        const contentRules: RulesProp = [{ type: 'required', message: '文章详情不能为空' }]
        // 提交后，创建文章并跳转到column/:id页面
        const uploadCheck = (file: File) => {
            const result = beforeUploadedCheck(file, { format: ['image/jpeg', 'image/png'], size: 1 })
            const { passed, error } = result
            if (error === 'format') {
                createMessage('上传图片只能是 JPG/PNG 格式!', 'error')
            }
            if (error === 'size') {
                createMessage('上传图片大小不能超过 1Mb', 'error')
            }
            return passed
        }
        // Uploader组件中，上传成功触发此事件，保存图片id，以便后续创建好文章后可以显示上传的图片
        const handleFileUploaded = (rowData: ResponseType<ImageProps>) => {
            if (rowData.data._id) {
                imageId = rowData.data._id
            }
        }
        // 提交
        const onFormSubmit = (value: boolean) => {
            if (value) {
                const { column, _id } = store.state.user
                if (column) {
                    const newPost: PostProps = {
                        _id: new Date().getTime().toString(),
                        title: titleVal,
                        content: contentVal,
                        createdAt: new Date().toLocaleString(),
                        column: column,
                        author: _id
                    }
                    // 对应
                    if (imageId) {
                        newPost.image = imageId
                    }
                    store.dispatch('createPost', newPost).then(() => {
                        createMessage('发表成功，2秒后跳转到文章', 'success', 2000)
                        setTimeout(() => {
                            router.push({ name: 'column', params: { id: column } })
                        }, 2000)
                    })
                }
            }
        }
        return {
            titleRules,
            contentRules,
            titleVal,
            contentVal,
            onFormSubmit,
            uploadCheck,
            handleFileUploaded
        }
    }
})
</script>

<style>
.create-post-page .file-upload-container {
    height: 200px;
    cursor: pointer;
    overflow: hidden;
}
.create-post-page .file-upload-container img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
</style>
