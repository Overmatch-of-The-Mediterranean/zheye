<template>
    <div class="file-upload">
        <button class="btn btn-primary" @click.prevent="triggerUpload">
            <slot v-if="fileStatus === 'loading'" name="loading">正在上传...</slot>
            <slot v-else-if="fileStatus === 'success'" name="uploaded" :uploadedData="uploadedData">上传成功</slot>
            <slot v-else>点击上传</slot>
        </button>
        <input type="file" ref="fileInput" class="file-input d-none" @change="handleFileChange" />
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
    emits: ['file-uploaded', 'file-uploaded-error'],
    setup(props, context) {
        const fileInput = ref<null | HTMLInputElement>(null)
        const fileStatus = ref<UploadStatus>('ready')
        const uploadedData = ref('')
        const triggerUpload = () => {
            if (fileInput.value) {
                fileInput.value.click()
            }
        }
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
