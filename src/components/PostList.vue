<template>
    <div class="post-list">
        <article v-for="post in postss" :key="post._id" class="card mb-3 shadow-sm">
            <div class="card-body">
                <h4>
                    <router-link :to="`/posts/${post._id}/`">{{post.title}}</router-link>
                </h4>
                <div class="row my-3 align-items-center">
                    <div v-if="post.image" class="col-4">
                        <img :src="post.image && post.image.fitUrl" :alt="post.title" class="rounded-lg w-100">
                    </div>
                    <p :class="{'col-8': post.image}" class="text-muted">{{post.excerpt}}</p>
                </div>
                <span class="text-muted">{{post.createdAt}}</span>
            </div>
        </article>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'
import { PostProps, ColumnProps } from '../store'
import { generateFitUrl } from '../helper'
export default defineComponent({
    name: 'PostList',
    props: {
        posts: {
            type: Array as PropType<PostProps[]>,
            required: true
        }
    },
    setup(props) {
        const postss = computed(() => {
            return props.posts.map(post => {
                generateFitUrl(post.image as ColumnProps, 200, 110)
                return post
            })
        })
        return {
            postss
        }
    }
})
</script>

<style>
.post-list h4 a {
    text-decoration: none;
    color: #1a1a1a;
}
.post-list h4 a:hover {
    color: #0d6efd;
}
</style>
