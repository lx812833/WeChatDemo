import { request } from '../utils/util'

// 商品分类
export const getCategories = () => {
  return request({
    url: 'goods/categories',
    method: 'get'
  })
}

// 根据分类获取商品
export const getGoods = (params) => {
  return request({
    url: 'goods/goods',
    data: params,
    method: 'get'
  })
}
