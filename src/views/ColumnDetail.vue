<template>
    <div class="column-detail-page w-75 mx-auto">
        <div class="column-info row mb-4 border-bottom pb-4 align-items-center" v-if="column">
            <div class="col-3 text-center">
                <img :src="column.avatar && column.avatar.fitUrl" :alt="column.title" class="rounded-circle border w-100">
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
import { defineComponent, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { GlobalProps, ColumnProps } from '@/store'
import PostList from '../components/PostList.vue'
import { generateFitUrl } from '@/helper'
export default defineComponent({
    name: 'ColumnDetail',
    components: { PostList },
    setup() {
        const store = useStore<GlobalProps>()
        const route = useRoute()
        const currentId = route.params.id
        onMounted(() => {
            console.log('currentId', currentId)
            store.dispatch('fetchColumn', currentId)
            store.dispatch('fetchPosts', currentId)
        })
        // 获取专栏数据
        const column = computed(() => {
            const selectColumn = store.getters.getColumnById(currentId) as ColumnProps | undefined
            if (selectColumn) {
                generateFitUrl(selectColumn, 100, 100)
            }
            return selectColumn
        })
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
