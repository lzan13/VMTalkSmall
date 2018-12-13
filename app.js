//app.js
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
     * 获取用户信息
     */
    wx.getSetting({
      success: res => {
        // 判断是否有获取用户信息权限
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.common.user = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回，所以此处加入 callback 以防止这种情况
              if (this.userReadyCallback) {
                this.userReadyCallback(res)
              }
            }
          })
        }
      }
    })

    /**
     * 获取手机系统信息
     */
    wx.getSystemInfo({
      success: res => {
        //导航高度
        this.common.navHeight = res.statusBarHeight + 48;
      }, fail(err) {
        console.log(err);
      }
    })

  },
  /**
   * 配置全局参数
   */
  common: {
    navHeight: 72,
    user: null,
  }
})