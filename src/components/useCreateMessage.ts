// 函数式创建组件

import { createApp } from 'vue'
import MessageView from './MessageView.vue'
export type MessageType = 'success' | 'error' | 'default'
const createMessage = (message:string, type:MessageType, timeout = 2000) => {
    // 创建组件实例，第一个参数是组件，第二个参数是要传入的属性
    const messageInstance = createApp(MessageView, {
        message,
        type
    })
    // 创建Dom将组件挂载到最外层Dom上
    const mountNode = document.createElement('div')
    document.body.appendChild(mountNode)
    messageInstance.mount(mountNode)
    // 2秒后弹窗消失并删除Dom
    setTimeout(() => {
        messageInstance.unmount()
        document.body.removeChild(mountNode)
    }, timeout)
}
export default createMessage
