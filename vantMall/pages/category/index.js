import { getCategories, getGoods, detailGoods } from '../../services/goods'

Page({
  data: {
    vtabs: [],
    activeTab: 0,
    imageURL: "https://thirdwx.qlogo.cn/mmopen/vi_32/ZU6icabEmOxVYReclUpjq4aLRicQxX5s43UXtzzTp4ELDXNpJJr8ricicQqAdhB7j3YyJvqZcZDibiazIezBnvUTyguQ/132",
    goodsListMap: {},
    loading: true,
  },

  async onLoad() {
    let categories = await getCategories()
    if (categories) {
      let vtabs = []
      for (let i = 0, len = categories.length; i < len; i++) {
        const el = categories[i]
        if (i < 3) {
          this.getGoodsListByCategory(el.id, i)
        }
        vtabs.push({ title: el.category_name, id: el.id })
      }
      this.setData({
        vtabs,
        loading: false
      })
    }
  },

  // 根据商品分类id获取商品
  async getGoodsListByCategory(categoryId, index, loadNextPage = false) {
    const pageSize = 10
    let pageIndex = 1
    let listMap = this.data.goodsListMap[categoryId]
    if (listMap) {
      // 加载完了就不需要重复加载了
      if (listMap.rows.length >= listMap.count) return
      if (listMap.pageIndex) {
        pageIndex = listMap.pageIndex
        if (loadNextPage) {
          pageIndex++
        }
      }
    }
    const params = {
      category_id: categoryId,
      page_size: pageSize,
      page_index: pageIndex
    }
    let result = await getGoods(params)
    if (listMap) {
      listMap.pageIndex = pageIndex
      listMap.count = result.count
      listMap.rows.push(...result.rows)
      this.setData({
        [`goodsListMap[${categoryId}]`]: listMap
      })
    } else {
      result.pageIndex = pageIndex
      this.setData({
        [`goodsListMap[${categoryId}]`]: result
      })
    }

    this.reClacChildHeight(index)
  },

  // 重新计算高度
  reClacChildHeight(index) {
    // 调用组件方法
    const categoryVtabs = this.selectComponent('#category-vtabs')
    const goodsContent = this.selectComponent(`#goods-content${index}`)
    categoryVtabs.calcChildHeight(goodsContent)
  },

  onScrollToIndexLower({ detail }) {
    let index = detail.index;
    // 这是一个多发事件
    if (index != this.data.lastIndexForLoadMore) {
      let cate = this.data.vtabs[index]
      let categoryId = cate.id
      this.getGoodsListByCategory(categoryId, index, true)
      this.data.lastIndexForLoadMore = index
    }
  },

  // 跳转商品详情
  async onTapGoods({ currentTarget }) {
    wx.showLoading({
      title: 'Loading...',
    })
    let goodsId = currentTarget.dataset.id
    // 由于数据不足，goodsId超过10取10内随机数
    if (goodsId > 10) {
      goodsId = Math.ceil(Math.random() * 10)
    }
    let goodsDetail = await detailGoods(goodsId)
    if (goodsDetail) {
      wx.navigateTo({
        url: `/pages/goods/index?goodsId=${goodsId}`,
        success: res => {
          res.eventChannel.emit('goodsData', { data: goodsDetail })
        }
      })
    }
    wx.hideLoading()
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
