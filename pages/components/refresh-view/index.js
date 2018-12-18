// pages/components/refresh-view/index.js
const vlog = require("../../../utils/vmlog.js");

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    
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
    _onScroll: function (event) {
      vlog.i("滚动");
    },
    _onScrollDown: function (event) {
      vlog.i("滚动到底部");
    },
    _onScrollTop: function (event) {
      vlog.i("滚动到顶部");
    },
    _onTouchEnd: function (event){
      vlog.i("触摸结束");
    }
  }
})