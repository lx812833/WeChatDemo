Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUseGetUserProfile: false,
  },
  onLoad() {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })

    }
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
    wx.getUserProfile({
      desc: '用于用户授权登陆',
      success: (res) => {
        const { userInfo, encryptedData, iv } = res
        this.setData({
          userInfo,
          hasUserInfo: true
        })
        this.handleUserLogin(encryptedData, iv)
      }
    })
  },
  // 用户登录
  handleUserLogin(encryptedData, iv) {
    wx.login({
      success: res => {
        wx.request({
          url: 'http://localhost:3000/users/login',
          method: 'POST',
          header: {
            'content-type': 'application/json'
          },
          data: {
            code: res.code,
            encryptedData,
            iv
          },
          success: user => {
            if (user.statusCode === 200 && user.data) {
              const { authorizationToken } = user.data.data
              getApp().globalData.token = authorizationToken
              getApp().globalData.userInfo = user.data.data
              console.log("登录成功", user.data.data)
            }
          }
        })
      }
    })
  },
  // 底部弹出层
  handleShowPopup() {
    this.setData({
      isShow: true
    })
  },
  handleClosePopup() {
    this.setData({
      isShow: false
    })
  }
})
