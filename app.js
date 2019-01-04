//app.js
const vlog = require("./utils/vmlog.js");
/**
 * 小程序入口，唯一的一个实例
 */
App({
  /**
   * 配置全局参数
   */
  data: {
    dimen: {
      sbHeight: 24,
      tbHeight: 48,
      navHeight: 72,
      wHeight: 667, // 这个是以 375*667 为基准进行预设
    },
    setting: {
      hitokotoType: null
    }
  },

  onLaunch: function() {

    /**
     * 展示本地存储能力
     */
    var hitokotoType = wx.getStorageSync('hitokoto_type') || {type: '0',name: '随机'};
    this.data.setting.hitokotoType = hitokotoType;

    /**
     * 获取手机系统信息
     */
    wx.getSystemInfo({
      success: res => {
        vlog.i(res);
        //导航高度
        this.data.dimen.sbHeight = res.statusBarHeight;
        this.data.dimen.navHeight = this.data.dimen.sbHeight + this.data.dimen.tbHeight;
        this.data.dimen.wHeight = res.windowHeight;
      },
      fail(err) {
        vlog.i(err);
      }
    })
  },
})