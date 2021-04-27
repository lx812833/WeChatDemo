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
    wx.checkSession({
      success: res => {
        let token = wx.getStorageSync('token')
        let userInfo = wx.getStorageSync('userInfo')
        if(token) {
          this.setData({
            hasUserInfo: true,
            userInfo
          })
          getApp().globalData.token = token
          getApp().globalData.userInfo = userInfo
        }
      }
    })
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
            'content-type': 'application/json',
            'Authorization': `Bearer ${getApp().globalData.token || ''}`
          },
          data: {
            code: res.code,
            encryptedData,
            iv,
            sessionKeyIsValid: true
          },
          success: user => {
            if (user.statusCode === 200 && user.data) {
              const { authorizationToken } = user.data.data
              wx.setStorageSync('token', authorizationToken)
              wx.setStorageSync('userInfo', user.data.data)
              getApp().globalData.token = authorizationToken
              getApp().globalData.userInfo = user.data.data
            }
          }
        })
      }
    })
  }
})
