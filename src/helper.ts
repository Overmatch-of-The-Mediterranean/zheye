import { ColumnProps } from './store'
// 处理图片大小或没有图片时，使用默认图片
export function generateFitUrl(column:ColumnProps, width:number, height:number) {
    if (column.avatar?.url) {
        column.avatar.fitUrl = column.avatar.url + `?x-oss-process=image/resize,h_${height},w_${width}`
    } else {
        column.avatar = {
            fitUrl: require('@/assets/column.jpg')
        }
    }
}
interface CheckCondition {
    format:string[],
    size:number
}
type Error = 'format' | 'size' | null
// 上传前的检查
const beforeUploadedCheck = (file:File, condition:CheckCondition) => {
    const { format, size } = condition
    const isValidFormat = format ? format.includes(file.type) : true
    const isValidSize = size ? (size / 1024 / 1024) : true
    let error:Error = null
    if (isValidFormat) {
        error = 'format'
    }
    if (isValidSize) {
        error = 'size'
    }
    return {
        passed: isValidFormat && isValidSize,
        error
    }
}
export default beforeUploadedCheck
