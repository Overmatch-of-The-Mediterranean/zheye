<template>
    <div class="home-page">
        <section class="py-5 text-center container">
            <div class="row py-lg-5">
                <div class="col-lg-6 col-md-8 mx-auto">
                    <img src="../assets/callout.svg" alt="callout" class="w-50" />
                    <h2 class="font-weight-light">随心写作，自由表达</h2>
                    <p>
                        <a href="#" class="btn btn-primary my-2">开始写文章</a>
                    </p>
                </div>
            </div>
        </section>
        <Uploader action="111" :beforeUpload="beforeUpload" @file-uploaded="OnFileUploaded" @file-uploaded-error="OnFileUploadedError">
            <template #uploaded="dataProps">
                <img :src="dataProps.uploadedData.data.url" alt="" width="500">
            </template>
        </Uploader>
        <h4 class="font-weight-bold text-center">发现精彩</h4>
        <ColumnList :list="list" />
    </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import ColumnList from '@/components/ColumnList.vue'
import { GlobalProps, ResponseType, ImageProps } from '@/store'
import createMessage from '@/components/useCreateMessage'
import Uploader from '@/components/Uploader.vue'
export default defineComponent({
    name: 'HomeView',
    components: { ColumnList, Uploader },
    props: {
        disabled: {
            type: Boolean,
            default: false
        }
    },
    setup() {
        const store = useStore<GlobalProps>() // 加上泛型，完善store语法提示
        onMounted(() => {
            store.dispatch('fetchColumns')
        })
        const list = computed(() => store.state.columns)
        const beforeUpload = (file: File) => {
            const isJPG = file.type === 'image/jpeg'
            console.log(file)

            if (!isJPG) {
                createMessage('上传图片只能是 JPG 格式', 'error')
            }
            return isJPG
        }
        const OnFileUploaded = (rowData: ResponseType<ImageProps>) => {
            createMessage(`上传图片ID: ${rowData.data._id}`, 'success')
        }
        const OnFileUploadedError = () => {
            createMessage('上传图片失败', 'error')
        }
        return {
            list,
            beforeUpload,
            OnFileUploaded,
            OnFileUploadedError
        }
    }
})
</script>

<style>
</style>
