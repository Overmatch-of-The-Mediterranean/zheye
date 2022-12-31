<template>
    <div class="row">
        <div class="col-4 mb-4" v-for="column in columnList" :key="column._id">
            <div class="card h-100 shadow-sm">
                <div class="card-body text-center">
                    <img :src="column.avatar && column.avatar.url" class="rounded-circle border border-light my-3" :alt="column.title" />
                    <h5 class="card-title">{{ column.title }}</h5>
                    <p class="card-text text-left">{{ column.description }}</p>
                    <router-link :to="{name:'column',params:{id:column._id}}" href="#" class="btn btn-outline-primary">进入专栏</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'

// 每个专栏的数据类型
import { ColumnProps } from '@/store'
export default defineComponent({
    name: 'ColumnList',
    props: {
        list: {
            type: Array as PropType<ColumnProps[]>,
            required: true
        }
    },
    setup(props) {
        // 专栏图片是否存在的处理
        const columnList = computed(() => {
            console.log('proplist', props.list)

            return props.list.map(column => {
                if (!column.avatar) {
                    // 不存在，则使用指定的图片
                    column.avatar = {
                        url: require('@/assets/column.jpg')
                    }
                }
                return column
            })
        })
        return {
            columnList
        }
    }
})
</script>

<style>
.card-body img {
    width: 50px;
    height: 50px;
}
</style>
