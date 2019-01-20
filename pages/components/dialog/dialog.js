// pages/components/dialog/dialog.js
Component({
  /**
   * 组件配置
   * 这里启用多slot支持
   */
  options: {
    multipleSlots: true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String,
    },
    isShow: {
      type: Boolean,
      value: false
    }
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
    /**
     * 隐藏对话框
     */
    _hideDialog: function() {
      this.setData({
        isShow: false
      });
    }
  }
})