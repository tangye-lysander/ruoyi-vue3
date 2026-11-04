import { isHttp } from '@/utils/validate'

// OSS 图片前缀，上传接口返回的是 objectKey（形如 /xxx/yyy.png），渲染时需拼接此前缀
const ossPrefix = import.meta.env.VITE_APP_OSS_PREFIX || ''

/**
 * 将后端返回的图片值转换为可渲染的完整地址
 * - 空值：返回空字符串
 * - 已是 http(s) 完整地址：原样返回，避免重复拼接
 * - objectKey：拼接 OSS 前缀
 * @param {string} src 图片地址或 objectKey
 * @returns {string} 可直接用于 src 的地址
 */
export function resolveImg(src) {
  if (!src) {
    return ''
  }
  if (isHttp(src)) {
    return src
  }
  const key = src.startsWith('/') ? src : '/' + src
  return ossPrefix + key
}

/**
 * 批量转换，兼容逗号分隔的多图字符串
 * @param {string} src 逗号分隔的图片地址或 objectKey
 * @returns {string[]} 完整地址数组
 */
export function resolveImgList(src) {
  if (!src) {
    return []
  }
  return String(src).split(',').filter(item => item).map(resolveImg)
}
