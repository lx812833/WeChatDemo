import { getCategories, getGoods } from '../../services/goods'

Page({
  data: {
    vtabs: [],
    activeTab: 0,
    imageURL: "https://thirdwx.qlogo.cn/mmopen/vi_32/ZU6icabEmOxVYReclUpjq4aLRicQxX5s43UXtzzTp4ELDXNpJJr8ricicQqAdhB7j3YyJvqZcZDibiazIezBnvUTyguQ/132",
    goodsListMap: {}
  },

  async onLoad() {
    let categories = await getCategories()
    if(categories) {
      let vtabs = []
      for (let i = 0, len = categories.length; i < len; i++) {
        const el = categories[i]
        await this.getGoodsListByCategory(el.id)
        vtabs.push({ title: el.category_name, id: el.id })
      }
      this.setData({ vtabs })

      // 调用组件方法
      const vtabsComponent = this.selectComponent("#vtabs")
      console.log("vtabsComponent", vtabsComponent, vtabsComponent.test(1))
    }
  },

  // 根据商品分类id获取商品
  async getGoodsListByCategory(categoryId) {
    const data = {
      category_id: categoryId,
      page_size: 10,
      page_index: 1
    }
    let result = await getGoods(data)
    if (result) {
      this.setData({
        [`goodsListMap[${categoryId}]`]: result
      })
    }
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
