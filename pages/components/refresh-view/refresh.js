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
    },
    isRefreshFinish: {
      type: Boolean,
      value: true,
      observer: function(b) {
        this._onRefreshFinish(b);
      }
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
    pullStatus: STATUS.normal, // 参见 {@link STATUS}
    scrollTop: 0, // 滚动距离顶部的高度
  },

  /**
   * 组件的方法列表
   */
  methods: {
    ready: function() {
      this.setData({
        pullStatus: STATUS.normal,
        pullHeight: 0,
      });
    },
    /**
     * 滚动到顶部
     */
    _onScrollTop: function(e) {
      vlog.i("滚动到顶部 ");
      this.setData({
        scrollTop: 0
      })
    },
    /**
     * 滚动中
     */
    _onScroll: function(e) {
      vlog.i("滚动距离顶部 " + e.detail.scrollTop);
      this.setData({
        scrollTop: e.detail.scrollTop
      })
    },
    /**
     * 滚动到底部
     */
    _onScrollBottom: function(e) {
      vlog.i("滚动到底部 ");
    },
    /**
     * 触摸开始
     */
    _onTouchStart: function(e) {
      vlog.i("触摸开始 ");
      if (!this.canRefresh()) {
        return;
      }
      this.firstData = {
        top: this.data.scrollTop,
        y: e.touches[0].clientY,
      };
    },
    /**
     * 触摸移动
     */
    _onTouchMove: function(e) {
      if (!this.canRefresh() || this.data.scrollTop > 0) {
        return;
      }
      vlog.i("触摸移动 准备下拉刷新");
      var distance = this.moveDistance(e.touches[0]);
      if (distance > 0) {
        var pullDistance = distance - this.firstData.top;
        if (pullDistance < 0) {
          pullDistance = 0;
          this.firstData.top = distance;
        }
        var height = this.easing(e.touches[0], pullDistance);
        vlog.i("下拉高度 " + pullDistance + ", " + height);
        this.setData({
          pullStatus: height > 0 ? STATUS.pulling : STATUS.normal,
          pullHeight: height,
        });
      }
    },
    /**
     * 触摸结束
     */
    _onTouchEnd: function(e) {
      vlog.i("触摸结束 ");
      if (!this.canRefresh()) {
        return;
      }
      if (this.data.pullHeight > 60) {
        this.setData({
          pullStatus: STATUS.refreshing,
          pullHeight: 60,
        })
        this.triggerEvent("onRefresh");
      } else {
        this.setData({
          pullStatus: STATUS.normal,
          pullHeight: 0,
        });
      }
    },
    /**
     * 刷新完成回调，重置状态
     */
    _onRefreshFinish: function(b) {
      vlog.i("刷新完成 " + b);
      if (b) {
        this.setData({
          pullStatus: STATUS.finish
        });
        setTimeout(() => {
          this.setData({
            pullStatus: STATUS.normal,
            pullHeight: 0,
          });
        }, 1000);
      }
    },


    /**
     * 判断是否能够刷新
     */
    canRefresh: function() {
      let status = this.data.pullStatus;
      return [STATUS.refreshing, STATUS.loading].indexOf(status) < 0;
    },
    /**
     * 计算距离
     */
    moveDistance: function(touch) {
      return touch.clientY - this.firstData.y;
    },

    /**
     * 计算下拉高度
     */
    easing: function(y, distance) {
      distance = distance > 280 ? 280 : distance;
      return Math.exp(-distance / 280) * distance;
    }
  }
})