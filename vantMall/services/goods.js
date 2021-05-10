import { request } from '../utils/util'

// 商品分类
export const getCategories = () => {
  return request({
    url: 'goods/categories',
    method: 'get'
  })
} 