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
import { defineComponent, computed } from 'vue'
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
        const list = computed(() => store.state.columns)
        return {
            list
        }
    }
})
</script>

<style>
</style>
