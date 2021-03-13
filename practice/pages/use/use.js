// pages/use/use.js
Page({
  data: {
    width: 100,
    height: 100,
    percentValue: 15
  },
  // 7环形进度条
  drawProgress() {
    if (this.data.percentValue >= 100) {
      this.setData({
        percentValue: 0
      })
    }
    this.setData({
      percentValue: this.data.percentValue + 10
    })
  },
  
  handleClick({ currentTarget }) {
    this.setData({
      width: 200,
      height: 200
    })
    console.log("点击了", currentTarget);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("监听页面加载");
    wx.showLoading({
      title: "加载中",
      success: () => {
        setTimeout(() => {
          wx.hideLoading()
        }, 1000);
      }
    })
    const system = wx.getSystemInfoSync();
    console.log("系统", system);
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log("监听页面初次渲染完成");
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log("监听页面显示");
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log("监听页面隐藏");
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log("监听页面卸载");
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  }
})