<template>
    <form class="validate-form-container">
        <!-- 存放ValidateInput组件 -->
        <slot name="default"></slot>
        <div class="submit-area" @click.prevent="submitForm">
            <slot name="submit">
                <button type="submit" class="btn btn-primary">提交</button>
            </slot>
        </div>
    </form>
</template>

<script lang="ts">
import { defineComponent, onUnmounted } from 'vue'
// 使用第三方库创建监听器，实现父子组件交流
import mitt from 'mitt'
type ValidateFunc = () => boolean
type Events = {
    'form-item-created': ValidateFunc
}

export const emitter = mitt<Events>() // 创建监听器，用与父子组件交流，父->子
export default defineComponent({
    name: 'ValidateForm',
    emits: ['form-submit'],
    setup(props, context) {
        // 存放每个ValidataInput组件的验证函数
        let funcArr: ValidateFunc[] = []
        // 表单提交，触发的点击事件
        const submitForm = () => {
            // 使用map，不使用every对funcArr进行循环处理的原因：
            // every只要返回false，就会立即停止，不会再遍历后面的数据，而map不会
            const result = funcArr.map(func => func()).every(result => result)
            context.emit('form-submit', result)
        }
        // 向funcArr数组添加验证函数
        const callback = (func: ValidateFunc) => {
            funcArr.push(func)
        }
        // 绑定事件，第一个参数：事件名，第二个参数绑定的回调函数
        emitter.on('form-item-created', callback)

        onUnmounted(() => {
            emitter.off('form-item-created', callback)
            funcArr = []
        })
        return {
            submitForm
        }
    }
})
</script>

<style ></style>
