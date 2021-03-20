Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  properties: {
    visible: {
      type: Boolean,
      value: false
    }
  },
  ready() {
    // 自定义组件触发事件时，需要使用 triggerEvent 方法，指定事件名、detail对象和事件选项
    this.triggerEvent("ready")
  },
  methods: {
    close() {
      this.triggerEvent("close")
    },
    handleClickMask({ target }) {
      if (target.dataset.type !== "unclose") {
        this.close()
      }
    }
  }
})