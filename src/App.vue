<template>
    <div class="container">
        <!-- 头部 -->
        <GlobalHeader :user="CurrentUser" />
        <LoadingView v-if="false" />
        <router-view></router-view>
        <footer class="text-center py-4 text-secondary bg-light mt-6">
            <small>
                <ul class="list-inline mb-0">
                    <li class="list-inline-item">© 2020 者也专栏</li>
                    <li class="list-inline-item">课程</li>
                    <li class="list-inline-item">文档</li>
                    <li class="list-inline-item">联系</li>
                    <li class="list-inline-item">更多</li>
                </ul>
            </small>
        </footer>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import 'bootstrap/dist/css/bootstrap.min.css'
import GlobalHeader from './components/GlobalHeader.vue'
import LoadingView from './components/LoadingView.vue'
import { GlobalProps } from './store'
export default defineComponent({
    name: 'App',
    components: {
        GlobalHeader,
        LoadingView
    },
    setup() {
        const store = useStore<GlobalProps>()
        // 获取ValidateInput组件
        const CurrentUser = computed(() => store.state.user)
        const isLoading = computed(() => store.state.loading)

        return {
            // list: testList,
            CurrentUser,
            isLoading
        }
    }
})
</script>

<style>
</style>
