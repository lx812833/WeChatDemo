const app = getApp()

Page({
  data: {
    nickName: '',
    avatarUrl: '',
    isCanDraw: false,
    showDialog: false,
    visible: false,
    loading: false,
    active: true
  },
  onLoad() {
    this.setData({
      nickName: wx.getStorageSync('nickName') || '',
      avatarUrl: wx.getStorageSync('avatarUrl') || ''
    })

    this.setData({
      slideButtons: [{
        text: '普通',
      }, {
        type: 'default',
        text: '普通',
      }, {
        type: 'warn',
        text: '警示',
      }],
    });

    wx.request({
      url: 'https://wxapi.kkgoo.cn/live/discover?type=hot',
      method: 'POST',
      success: (res) => {
        this.setDis(res);
      }
    })
  },
  // 获取用户信息
  getUserInfo(e) {
    this.setData({
      nickName: e.detail.userInfo.nickName,
      avatarUrl: e.detail.userInfo.avatarUrl
    })
    wx.setStorageSync('avatarUrl', e.detail.userInfo.avatarUrl)
    wx.setStorageSync('nickName', e.detail.userInfo.nickName)
  },
  createShareImage() {
    this.setData({
      isCanDraw: !this.data.isCanDraw
    })
  },
  onTap(e) {
    console.log(e.target)
  },
  // 测试weui组件弹框
  handleShowDialog() {
    this.setData({
      showDialog: true
    })
  },
  tapDialogButton({ detail }) {
    const { index } = detail
    console.log("点击", detail)
    if (index === 0) {
      this.setData({
        showDialog: false
      })
    }
  },
  slideButtonTap(e) {
    console.log('slide button tap', e.detail)
    this.setData({
      visible: true
    })
  },
  // 弹出框初始化
  handlePopUpReady() {
    console.log("弹出框初始化")
  },
  // 弹出框关闭
  handleClosePopUp() {
    console.log("弹出框关闭")
  },
  // 底部弹出框
  handleCancel() {
    this.setData({
      visible: false
    })
  },
  handleSure() {
    this.setData({
      visible: false
    })
  },
  //点击back事件处理
  goBack() {
    this.triggerEvent("back")
  },
  // 返回首页
  goHome() {
    wx.reLaunch({
      url: "/pages/index/index"
    })
  },
  // 页面滚动触发事件的处理函数
  onPageScroll(res) {
    if (res.scrollTop > 50) {
      if (!this.data.active) {
        this.setData({
          active: true
        })
      }
    } else if (this.data.active) {
      this.setData({
        active: false
      })
    }
  },
  setDis(r) {
    let newData = r.data.data;
    this.data.nextKey = newData.nextkey ? newData.nextkey : this.data.nextKey;
    this.setData({
      content: newData.discover ? newData.discover : this.data.content,
      banneritem: newData.cards ? newData.cards.slice(0, newData.cards.length - 1) : this.data.banneritem
    })
  },
  previewImage(e) {
    console.log(e);
    let url = e.currentTarget.dataset.url
    wx.previewImage({
      current: url,
      urls: [url],
    })
  }
})
