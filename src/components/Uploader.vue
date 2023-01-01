<template>
    <div class="file-upload">
        <div class="file-upload-container" @click.prevent="triggerUpload" v-bind="$attrs">
            <slot v-if="fileStatus === 'loading'" name="loading">
                <button class="btn btn-primary" disabled>正在上传...</button>
            </slot>
            <slot v-else-if="fileStatus === 'success'" name="uploaded" :uploadedData="uploadedData">
                <button class="btn btn-primary">上传成功</button>
            </slot>
            <slot v-else name="default">
                <button class="btn btn-primary">点击上传</button>
            </slot>
        </div>
        <input type="file" class="file-input d-none" ref="fileInput" @change="handleFileChange">
    </div>
</template>

<script lang="ts">
import axios from 'axios'
import { defineComponent, PropType, ref } from 'vue'
type UploadStatus = 'ready' | 'success' | 'error' | 'loading'
type CheckFunction = (file: File) => boolean
export default defineComponent({
    name: 'Uploader',
    props: {
        action: {
            type: String,
            required: true
        },
        beforeUpload: Function as PropType<CheckFunction>
    },
    inheritAttrs: false,
    emits: ['file-uploaded', 'file-uploaded-error'],
    setup(props, context) {
        const fileInput = ref<null | HTMLInputElement>(null)
        const fileStatus = ref<UploadStatus>('ready')
        const uploadedData = ref('')
        // 点击按钮，触发上传弹框
        const triggerUpload = () => {
            if (fileInput.value) {
                fileInput.value.click()
            }
        }
        // 上传文件前检查，将表单数据用请求发送到服务器并根据返回结果，改变上传的状态，以便对应不同的视图
        const handleFileChange = (e: Event) => {
            const currentTarget = e.target as HTMLInputElement
            if (currentTarget.files) {
                const files = Array.from(currentTarget.files)
                if (props.beforeUpload) {
                    const result = props.beforeUpload(files[0])
                    if (!result) {
                        return
                    }
                }
                fileStatus.value = 'loading'
                const formData = new FormData()
                formData.append('file', files[0])
                axios
                    .post(props.action, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    })
                    .then(res => {
                        console.log(res.data)
                        fileStatus.value = 'success'
                        context.emit('file-uploaded', res.data)
                        uploadedData.value = res.data
                    })
                    .catch(() => {
                        fileStatus.value = 'error'
                        context.emit('file-uploaded-error')
                    })
                    .finally(() => {
                        if (fileInput.value) {
                            fileInput.value.value = ''
                        }
                    })
            }
        }
        return {
            fileInput,
            fileStatus,
            uploadedData,
            triggerUpload,
            handleFileChange
        }
    }
})
</script>

<style>
</style>
