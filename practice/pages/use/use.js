// pages/use/use.js
Page({
  data: {
    width: 100,
    height: 100,
    percentValue: 15,
    nodes: [{
      name: 'div',
      attrs: {
        class: 'div_class',
        style: 'line-height: 20px;padding:20px;'
      },
      children: [
        {
          type: 'text',
          text: '中文Hello&nbsp;World!'
        },
        {
          name: 'br',
        },
        {
          name: 'img',
          attrs: {
            src: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=111713540,615806613&fm=26&gp=0.jpg',
            // style:'width:100%;'
            style: 'width: 100%; font-size: 0; display: block'  // 去除图片间的间隙
          }
        },
        {
          name: 'img',
          attrs: {
            src: 'https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3363295869,2467511306&fm=26&gp=0.jpg',
            style: 'width:100%;',
            class: 'img'
          }
        },
        {
          name: 'img',
          attrs: {
            src: 'https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2853553659,1775735885&fm=26&gp=0.jpg',
            style: 'width:100%;',
            class: 'img'
          }
        },
        {
          name: 'img',
          attrs: {
            src: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=111713540,615806613&fm=26&gp=0.jpg',
            // style:'width:100%;'
            style: 'width: 100%; font-size: 0; display: block'  // 去除图片间的间隙
          }
        }]
    },
    {
      name: 'div',
      attrs: {
        class: 'div_class',
        style: 'line-height: 60px; color: red;'
      },
      children: [{
        type: 'text',
        text: `You never know what you're gonna get.'`
      }]
    }],
    urls: [], // nodes中图片节点
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
    function findImageUrl(nodes) {
      let urls = []
      nodes.forEach(item => {
        if (item.attrs) {
          for (const key in item.attrs) {
            if (key === 'src') {
              urls.push(item.attrs[key])
            }
          }
        }
        if (item.children) {
          urls = urls.concat(findImageUrl(item.children))
        }
      })
      return urls
    }
    this.setData({
      urls: findImageUrl(this.data.nodes)
    })
    console.log("this.data.urls", this.data.urls)
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
  },

  /**
   * rich-text点击事件
   */
  handleTapRichText(e) {
    let urls = this.data.urls
    wx.previewImage({
      current: urls[0],
      urls: urls
    })
  }
})