import { onMounted, onUnmounted, ref, Ref } from 'vue'
// 判断当前点击的元素是否在dropdown显示范围内
const useClickOutside = (elementRef:Ref<null | HTMLElement>) => {
    const isClickOutside = ref(false)
    const handler = (e:MouseEvent) => {
        if (elementRef.value) {
            if (elementRef.value?.contains(e.target as HTMLElement)) {
                isClickOutside.value = false
            } else {
                isClickOutside.value = true
            }
        }
    }
    // 初始化绑定事件
    onMounted(() => {
        document.addEventListener('click', handler)
    })
    onUnmounted(() => {
        document.removeEventListener('click', handler)
    })
    return isClickOutside
}

export default useClickOutside
