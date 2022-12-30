<template>
    <div class="dropdown" ref="dropdownRef">
        <a class="btn btn-outline-light my-2 dropdown-toggle" href="#" @click.prevent="toggleOpen">
            {{title}}
        </a>
        <ul v-if="isOpen" class="dropdown-menu" :style="{display: 'block'}">
            <slot></slot>
        </ul>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import useClickOutside from '../hooks/useClickOutside'
export default defineComponent({
    name: 'DropDown',
    props: {
        title: {
            type: String,
            required: true
        }
    },
    setup() {
        const isOpen = ref(false)
        // 此方式也可获取HTML元素
        const dropdownRef = ref<null | HTMLElement>(null)
        const toggleOpen = () => {
            isOpen.value = !isOpen.value
        }
        const isClickOutside = useClickOutside(dropdownRef)

        // 每次点击监听isClickOutside的变化，对isopen作出修改
        watch(isClickOutside, () => {
            if (isClickOutside.value && isOpen) {
                isOpen.value = false
            }
        })
        return {
            isOpen,
            toggleOpen,
            dropdownRef
        }
    }
})
</script>

<style></style>
