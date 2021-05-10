import { getCategories } from '../../services/goods'

Page({
  data: {
    vtabs: [],
    activeTab: 0,
  },

  onLoad() {
    getCategories().then(res => {
      const vtabs = res.map(item => ({ title: item.category_name }))
      this.setData({ vtabs })
    })
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
