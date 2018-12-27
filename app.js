//app.js
const vlog = require("./utils/vmlog.js");
/**
 * 小程序入口，唯一的一个实例
 */
App({
  onLaunch: function() {
    /**
     * 展示本地存储能力
     */
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    /**
     * 获取手机系统信息
     */
    wx.getSystemInfo({
      success: res => {
        vlog.i(res);
        //导航高度
        this.common.sbHeight = res.statusBarHeight;
        this.common.navHeight = this.common.sbHeight + this.common.tbHeight;
        this.common.wHeight = res.windowHeight;
      },
      fail(err) {
        vlog.i(err);
      }
    })
  },
  /**
   * 配置全局参数
   */
  common: {
    sbHeight: 24,
    tbHeight: 48,
    navHeight: 72,
    wHeight: 667, // 这个是以 375*667 为基准进行预设
  }
})