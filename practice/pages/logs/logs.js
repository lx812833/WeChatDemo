const app = getApp()

Page({
  data: {
    nickName: '',
    avatarUrl: '',
    isCanDraw: false
  },
  onLoad() {
    this.setData({
      nickName: wx.getStorageSync('nickName') || '',
      avatarUrl: wx.getStorageSync('avatarUrl') || ''
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
  }
})
