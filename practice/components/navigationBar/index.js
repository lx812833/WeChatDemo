Component({
  options: {
    multipleSlots: true
  },
  properties: {
    "ext-class": {
      type: String,
      value: ''
    },
    loading: {
      type: Boolean,
      value: false
    },
    active: {
      type: Boolean,
      value: false
    }
  },
  lifetimes: {
    // 在组件实例进入页面节点树时执行
    attached: function () {
      // 组件被加载时，计算ios、android两个平台的尺寸差异
      let isSupport = !!wx.getMenuButtonBoundingClientRect;
      let rect = wx.getMenuButtonBoundingClientRect ? wx.getMenuButtonBoundingClientRect() : null;
      console.log("isSupport", isSupport, rect)
      wx.getSystemInfo({
        success: (res) => {
          let ios = !!(res.system.toLowerCase().search('ios') + 1);
          let statusBarHeight = res.statusBarHeight;
          let topBarHeight = ios ? (44 + statusBarHeight) : (48 + statusBarHeight);
          this.setData({
            ios: ios,
            topBarHeight: topBarHeight,
            statusBarHeight: statusBarHeight,
            innerWidth: isSupport ? 'width:' + rect.left + 'px' : '',
            innerPaddingRight: isSupport ? 'padding-right:' + (res.windowWidth - rect.left) + 'px' : '',
            leftWidth: isSupport ? 'width:' + (res.windowWidth - rect.left) + 'px' : ''
          });
        },
      })
      // back箭头处理的显示
      // 获取当前页面栈。数组中第一个元素为首页，最后一个元素为当前页面。
      let pages = getCurrentPages()
      if (pages.length > 1) {
        this.setData({ showBack: true })
      }
    }
  },
  methods: {
    // 双击返回顶部
    doubleClick(e) {
      if (this.timeStamp && (e.timeStamp - this.timeStamp < 300)) {
        this.timeStamp = 0
        wx.pageScrollTo({
          scrollTop: 0,
          duration: 300
        })
      } else {
        this.timeStamp = e.timeStamp
      }
    }
  }
})