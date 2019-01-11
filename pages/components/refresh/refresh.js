// pages/components/refresh/refresh.js
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
    animation: {},
    isRefresh: false, // 判断是否刷新中
    isLoadMore: false, // 判断是否正在加载更多
    isHasMore: false, // 是否有更多数据
    pullHeight: 0, // 拉动的高度
    pullStatus: STATUS.normal, // 参见 {@link STATUS}
    scrollTop: 0, // 滚动距离顶部的高度
  },
  /**
   * 组件生命周期方法
   */
  ready: function() {
    this.animation = wx.createAnimation({
      duration: 1000,
      timingFunction: "ease"
    });

    this.setData({
      pullStatus: STATUS.normal,
      pullHeight: 0,
    });
  },
  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 滚动到顶部
     */
    _onScrollTop: function(e) {
      this.setData({
        scrollTop: 0
      })
    },
    /**
     * 滚动中
     */
    _onScroll: function(e) {
      this.setData({
        scrollTop: e.detail.scrollTop
      })
    },
    /**
     * 滚动到底部
     */
    _onScrollBottom: function(e) {},
    /**
     * 触摸开始
     */
    _onTouchStart: function(e) {
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
      var distance = this.moveDistance(e.touches[0]);
      if (distance > 0) {
        var pullDistance = distance - this.firstData.top;
        if (pullDistance < 0) {
          pullDistance = 0;
          this.firstData.top = distance;
        }
        var height = this.easing(pullDistance);
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

      if (!this.canRefresh()) {
        return;
      }
      if (this.data.pullHeight > 100) {
        this.animTranslate(0, 100 - this.data.pullHeight, 200);
        this.setData({
          animation: this.animation.export(),
        });
        // 动画执行完成，重置状态
        setTimeout(() => {
          this.animTranslate(0, 0, 5);
          this.setData({
            animation: this.animation.export(),
          });
          this.setData({
            pullStatus: STATUS.refreshing,
            pullHeight: 100,
          });
          this.triggerEvent("onRefresh");
        }, 210);
      } else {
        this.animTranslate(0, -this.data.pullHeight, 200);
        this.setData({
          animation: this.animation.export(),
        });
        // 动画执行完成，重置状态
        setTimeout(() => {
          this.animTranslate(0, 0, 5);
          this.setData({
            animation: this.animation.export(),
            pullStatus: STATUS.normal,
            pullHeight: 0,
          });
        }, 210);
      }
    },
    /**
     * 刷新完成回调，重置状态
     */
    _onRefreshFinish: function(b) {
      if (b) {
        this.setData({
          pullStatus: STATUS.finish
        });
        this.animTranslate(0, -this.data.pullHeight, 200);
        this.setData({
          animation: this.animation.export(),
        });
        // 动画执行完成，重置状态
        setTimeout(() => {
          this.animTranslate(0, 0, 5);
          this.setData({
            animation: this.animation.export(),
            pullStatus: STATUS.normal,
            pullHeight: 0,
          });
        }, 210);
      }
    },

    /**
     * 平移动画
     */
    animTranslate: function(x, y, time) {
      this.animation.translate(x, y).step({
        duration: time
      })
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
    easing: function(distance) {
      // 阻尼公式 -1 / 1500x ^ 2 + 0.6x
      return -1 /1500 * distance * distance + 0.6 * distance;
    }
  }
})