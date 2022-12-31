<template>
    <!-- input框及错误提示 -->
    <div class="validate-input-container pb-3">
        <input v-if="tag === 'input'" type="text" v-bind="$attrs" class="form-control" :class="{'is-invalid': inputRef.error}" :value="inputRef.val" @input="updateValue" @blur="validateInput">
        <textarea v-else type="text" v-bind="$attrs" class="form-control" :class="{'is-invalid': inputRef.error}" :value="inputRef.val" @input="updateValue" @blur="validateInput"></textarea>
        <span v-if="inputRef.error" class="invalid-feedback">{{inputRef.message}}</span>
    </div>
</template>
<script lang="ts">
import { defineComponent, reactive, PropType, onMounted } from 'vue'
import { emitter } from './ValidateForm.vue'
// 正则表达式
const emailReg = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
export interface RuleProp {
    type: 'required' | 'email' | 'custom'
    message: string
    validator?: () => boolean
}
type tag = 'input' | 'textarea' // 用来判断使用input还是textarea
export type RulesProp = RuleProp[]
export default defineComponent({
    name: 'ValidateInput',
    // 禁止attribute继承到根组件，用于向组件传递属性，将传递的属性绑定到组件内某个元素上
    inheritAttrs: false,
    props: {
        rules: Array as PropType<RulesProp>,
        modelValue: String,
        tag: {
            type: String as PropType<tag>,
            default: 'input'
        }
    },
    setup(props, context) {
        const inputRef = reactive({
            val: props.modelValue || '',
            error: false,
            message: ''
        })
        // 子组件调用父组件的自定义事件向父组件传递数据 子组件中使用:value和@input
        const updateValue = (e: KeyboardEvent) => {
            const targetValue = (e.target as HTMLInputElement).value
            inputRef.val = targetValue
            // 触发的update:modelValue事件，是父组件使用v-model后，其背后的语法糖所绑定的事件
            context.emit('update:modelValue', targetValue)
        }
        // 验证表单
        const validateInput = () => {
            if (props.rules) {
                const allPassed = props.rules.every(rule => {
                    let passed = true
                    inputRef.message = rule.message
                    switch (rule.type) {
                        case 'required':
                            passed = inputRef.val.trim() !== ''
                            break
                        case 'email': {
                            passed = emailReg.test(inputRef.val)
                            break
                        }
                        case 'custom': {
                            passed = rule.validator ? rule.validator() : true
                            break
                        }
                    }
                    return passed
                })
                inputRef.error = !allPassed
                return allPassed
            }
            return true
        }
        // 将子组件的东西传递给父组件，在父组件中可直接使用
        onMounted(() => {
            // 第一个参数：触发父组件的事件名，第二个参数：向父组件传递的东西
            emitter.emit('form-item-created', validateInput)
        })
        return {
            inputRef,
            validateInput,
            updateValue
        }
    }
})
</script>
