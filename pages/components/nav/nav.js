// components/nav/nav.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    sbHeight: {
      type: Number,
      value: 24
    },
    enableBack: {
      type: Boolean,
      value: false
    },
    navTitle: {
      type: String,
      value: "Nav Title"
    },
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    _onBack: function() {
      wx.navigateBack({
        delta: 1
      })
    }
  }
})