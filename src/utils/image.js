import { isHttp } from '@/utils/validate'

/**
 * 将后端返回的图片值转换为可渲染的完整地址
 *
 * 后端已统一返回完整 URL（数据库存 objectKey，接口层转换），
 * 此函数仅做空值处理与 http(s) 校验，不再做任何前缀拼接。
 *
 * @param {string} src 图片地址
 * @returns {string} 可直接用于 src 的地址
 */
export function resolveImg(src) {
  if (!src) {
    return ''
  }
  if (isHttp(src)) {
    return src
  }
  // 非完整地址（理论上不应出现），原样返回
  return src
}

/**
 * 批量转换，兼容逗号分隔的多图字符串
 * @param {string} src 逗号分隔的图片地址
 * @returns {string[]} 完整地址数组
 */
export function resolveImgList(src) {
  if (!src) {
    return []
  }
  return String(src).split(',').filter(item => item).map(resolveImg)
}
