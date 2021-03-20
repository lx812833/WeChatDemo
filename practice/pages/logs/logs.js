const app = getApp()

Page({
  data: {
    nickName: '',
    avatarUrl: '',
    isCanDraw: false,
    showDialog: false,
    visible: false
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
  }
})
