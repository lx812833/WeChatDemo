Component({
  runTimerid: 0,
  // 属性定义
  properties: {
    percent: {
      type: Number, // 属性类型
      value: 0, // 属性初始值
      // observer: 属性值变化时的回调函数
      observer: function (newVal, oldVal) {
        this.handleDraw(newVal)
      }
    }
  },
  // 私有数据，可用于模板渲染
  data: {
    percentage: '', // 百分比
    animTime: '', // 动画执行时间
  },
  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function () { },
    moved: function () { },
    detached: function () { },
  },

  // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
  attached: function () { }, // 此处attached的声明会被lifetimes字段中的声明覆盖
  ready: function () { },

  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show: function () { },
    hide: function () { },
    resize: function () { },
  },

  ready() {
    if (this.data.percent) {
      // properties传递的值
      this.handleDraw(this.data.percent)
    }
  },
  methods: {
    // 绘制圆环
    handleDraw(percent) {
      const id = 'runCircle'
      const animTime = 500
      if (!this.ctx) {
        // 使用 wx.createCanvasContext 获取绘图上下文 context
        // 注意：在自定义组件下，当前组件实例的this，表示在这个自定义组件下查找拥有 canvas-id 的 canvas ，如果省略则不在任何自定义组件内查找
        const ctx = wx.createCanvasContext(id, this)
        this.ctx = ctx
      }
      let oldPercentValue = this.data.percentage
      this.setData({
        percentage: percent,
        animTime: animTime
      })
      let time = this.data.animTime / (this.data.percentage - oldPercentValue)
      // 获取页面或组件中界面上的节点信息
      // 注意：如果是在组件中查找节点时，必须使用 .in() 方法，并把 this 传递进去
      const query = wx.createSelectorQuery().in(this)
      // 节点信息查询 API 可以用于获取节点属性、样式、在界面上的位置等信息
      query.select('#' + id).boundingClientRect(res => {
        let w = parseInt(res.width / 2)
        let h = parseInt(res.height / 2)
        if (this.runTimerid) {
          clearTimeout(this.runTimerid)
        }
        this.canvasTap(oldPercentValue, percent, time, w, h)
      }).exec()
    },
    // 动画效果实现
    canvasTap(start, end, time, w, h) {
      start++
      if (start > end) {
        return false
      }
      if (start >= 100) {
        start = 100
      }
      this.handleSetRun(start, w, h)

      this.runTimerid = setTimeout(() => {
        this.canvasTap(start, end, time, w, h)
      }, time)
    },
    // 绘制圆形进度条方法
    handleSetRun(c, w, h) {
      let num = (2 * Math.PI / 100 * c) - 0.5 * Math.PI
      this.ctx.arc(w, h, w - 8, -0.5 * Math.PI, num)
      this.ctx.setStrokeStyle("#09bb07") //绿色
      this.ctx.setLineWidth("16")
      this.ctx.setLineCap("butt")
      this.ctx.stroke()

      this.ctx.beginPath()
      this.ctx.setFontSize(40)  //注意不要加引号
      this.ctx.setFillStyle("#b2b2b2")//浅灰色字体
      this.ctx.setTextAlign("center")
      this.ctx.setTextBaseline("middle")
      this.ctx.fillText(c + "%", w, h)
      this.ctx.draw()
    }
  }
})