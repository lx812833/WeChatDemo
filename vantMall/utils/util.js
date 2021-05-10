import config from '../config'

export const request = (options) => {
  /**
   * @param {object} data 传参
   * @param {string} method 请求方法
   * @param {string} url
   * @param {object} etcs request函数的其他属性
   */
  const { data, method = 'get', url, etcs } = options

  console.log("getApp().globalData.token", getApp().globalData.token)

  return new Promise((resolve, reject) => {
    wx.request({
      url: `${config.serverPath}/${url}`,
      method: method,
      data: data,
      header: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${getApp().globalData.token || ''}`
      },
      ...etcs,
      success: res => {
        if (res.data.code === 200) {
          resolve(res.data.data)
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'error',
            duration: 2000
          })
          reject()
        }
      },
      fail: error => {
        reject()
      }
    })
  })
}