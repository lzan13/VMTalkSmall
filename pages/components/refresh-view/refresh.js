// pages/components/refresh-view/index.js
const vlog = require("../../../utils/vmlog.js");

const STATUS = {
  normal: "normal",
  pulling: "pulling",
  refreshing: "refreshing",
  finish: "finish",
  loading: "loading",
};
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    scrollHeight: {
      type: Number
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isRefresh: false, // 判断是否刷新中
    isLoadMore: false, // 判断是否正在加载更多
    isHasMore: false, // 是否有更多数据
    pullHeight: 0, // 拉动的高度
    pullStatus: 0, // 0-滚动到顶部 1-滚动到中间 2-滚动到底部
    scrollTop: 0,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    ready: function() {
      this.setData({
        pullStatus: STATUS.normal
      });
    },
    /**
     * 滑动中
     */
    _onScroll: function(e) {
      const top = e.detail.scrollTop;
      vlog.i("滚动距离顶部 " + top);
    },
    /**
     * 滑动到底部
     */
    _onScrollBottom: function(e) {
      vlog.i("滚动到底部 ");
    },
    /**
     * 触摸开始
     */
    _onTouchStart: function(e) {
      vlog.i("触摸开始 ");
    },
    /**
     * 触摸移动
     */
    _onTouchMove: function(e) {
      vlog.i("触摸移动 ");
      if (isRefresh || this.data.scrollTop > 0) {
        return;
      }
    },
    /**
     * 触摸结束
     */
    _onTouchEnd: function(e) {
      vlog.i("触摸结束 ");
      if (isRefresh || this.data.scrollTop > 0) {
        return;
      }
    },

  }
})