import { onUnmounted } from 'vue'
// 创建Dom函数，用于存放组件
const useCreateDom = (nodeId:string) => {
    const node = document.createElement('div')
    node.id = nodeId
    document.body.appendChild(node)
    // 组件销毁时，移除创建的Dom节点
    onUnmounted(() => {
        document.body.removeChild(node)
    })
}

export default useCreateDom
