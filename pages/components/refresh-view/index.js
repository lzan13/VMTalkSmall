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
    sstatus: 1,// 1是滑动到顶部 2是滑动中中 3是滑动到底部
    isRefresh: false,//是否显示刷新头
    isLoadMore: false,//加载更多
    clientY: 0,//Y方向手指按下的方向
  },

  /**
   * 组件的方法列表
   */
  methods: {

    //滑动到顶端
    _onScrollTop: function (e) {
      this.setData({
        sstatus: 1
      })
    },
    //滑动到底部
    _onScrollBottom: function (e) {
      this.setData({
        sstatus: 3
      })

    },
    /**
     * 滑动中
     */
    _onScroll: function (e) {
      this.setData({
        sstatus: 2,
      })

    },
    /**
     * 手指按下
     */
    _onTouchStart: function (e) {
      console.log(e)
      var touchPoint = e.touches[0];
      var clientY = touchPoint.clientY
      this.setData({
        clientY: clientY
      })
    },
    /**
    * 抬起手指
    */
    _onTouchEnd: function (e) {
      console.log(e)
      var context = this
      var upPoint = e.changedTouches[0];
      var endY = upPoint.clientY
      var pointTopointY = Math.abs(endY - this.data.clientY)
      var status = this.data.sstatus
      vlog.i("滑动的距离:" + pointTopointY + "----:当前的状态:" + status)
      //上拉刷新
      if (status == 1 && pointTopointY > 50) {
        this.setData({
          isRefresh: true
        })
      }
      //上拉加载
      if (status == 3 && pointTopointY > 50) {
        this.setData({
          isLoadMore: true
        })
      }
      //两秒后隐藏加载条条
      setTimeout(function () {
        context.setData({
          isRefresh: false,//是否显示刷新头
          isLoadMore: false,//加载更多
        })
      }, 3000)
    },

  }
})