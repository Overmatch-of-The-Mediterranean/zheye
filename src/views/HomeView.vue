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
        <h4 class="font-weight-bold text-center">发现精彩</h4>
        <ColumnList :list="list" />
    </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import ColumnList from '@/components/ColumnList.vue'
import { GlobalProps } from '@/store'
export default defineComponent({
    name: 'HomeView',
    components: { ColumnList },
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
        // 上传前图片格式的检查
        // const beforeUpload = (file: File) => {
        //     const isJPG = file.type === 'image/jpeg'
        //     console.log(file)

        //     if (!isJPG) {
        //         createMessage('上传图片只能是 JPG 格式', 'error')
        //     }
        //     return isJPG
        // }
        // const OnFileUploaded = (rowData: ResponseType<ImageProps>) => {
        //     createMessage(`上传图片ID: ${rowData.data._id}`, 'success')
        // }
        // const OnFileUploadedError = () => {
        //     createMessage('上传图片失败', 'error')
        // }
        return {
            list
            // beforeUpload,
            // OnFileUploaded,
            // OnFileUploadedError
        }
    }
})
</script>

<style>
</style>
