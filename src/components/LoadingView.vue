<template>
    <teleport to="#back">
        <div class="d-flex justify-content-center align-items-center h-100 w-100 loading-container" :style="{backgroundColor: background || ''}">
            <div class="loading-content">
                <div class="spinner-border text-primary" role="status">
                    <span class="sr-only">{{ text }}</span>
                </div>
                <p v-if="text" class="text-primary small">{{text}}</p>
            </div>
        </div>
    </teleport>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import useCreateDom from '@/hooks/useCreateDom'
export default defineComponent({
    name: 'LoadingView',
    props: {
        text: String,
        background: String
    },
    setup() {
        useCreateDom('back')
    }
})
</script>

<style>
.loading-container {
    background: rgba(255, 255, 255, 0.5);
    z-index: 100;
    position: fixed;
    top: 0;
    left: 0;
}
.loading-container {
    text-align: center;
}
</style>
