<template>
    <div class="column-detail-page w-75 mx-auto">
        <div class="column-info row mb-4 border-bottom pb-4 align-items-center" v-if="column">
            <div class="col-3 text-center">
                <img :src="column.avatar" :alt="column.title" class="rounded-circle border w-100">
            </div>
            <div class="col-9">
                <h4>{{column.title}}</h4>
                <p class="text-muted">{{column.description}}</p>
            </div>
        </div>
        <PostList :posts="posts"></PostList>
    </div>

</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { GlobalProps } from '@/store'
import PostList from '../components/PostList.vue'
export default defineComponent({
    name: 'ColumnDetail',
    components: { PostList },
    setup() {
        const store = useStore<GlobalProps>()
        const route = useRoute()
        const currentId = +route.params.id // 将string转化为number
        // 获取专栏数据
        const column = computed(() => store.getters.getColumnsById(currentId))
        // 获取文章数据
        const posts = computed(() => store.getters.getPostsByCid(currentId))
        return {
            column,
            posts
        }
    }
})
</script>

<style>
</style>
