import { getCategories, getGoods } from '../../services/goods'

Page({
  data: {
    vtabs: [],
    activeTab: 0,
    goodsListMap: {}
  },

  onLoad() {
    getCategories().then(res => {
      const vtabs = res.map(item => {
        this.getGoodsListByCategory(item.id)
        return ({ title: item.category_name, id: item.id })
      })
      this.setData({ vtabs })
    })
  },

  // 根据商品分类id获取商品
  async getGoodsListByCategory(categoryId) {
    const data = {
      category_id: categoryId,
      // page_size: 10,
      // page_index: 1
    }
    let result = await getGoods(data)
    if(result) {
      this.setData({
        [`goodsListMap[${categoryId}]`]: result
      })
    }
    console.log("商品列表", 123, this.data.goodsListMap)
  },

  onTabCLick(e) {
    const index = e.detail.index
    this.setData({ activeTab: index })
  },

  onChange(e) {
    const index = e.detail.index
    this.setData({ activeTab: index })
  }
})
