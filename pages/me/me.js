// pages/me/me.js
//获取应用实例
const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    user: {},
    isLoadUser: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (app.common.user) {
      // 已经有用户信息直接使用
      this.setData({
        isLoadUser: true,
        user: app.common.user
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回，所以此处加入 callback 以防止这种情况
      app.userReadyCallback = res => {
        this.setData({
          isLoadUser: true,
          user: res.userInfo
        })
      }
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  /**
   * 自定义方法，获取用户信息
   */
  getUserInfo: function (e) {
    console.log("手动获取授权的用户信息 "+e)
    app.common.user = e.detail.userInfo
    this.setData({
      isLoadUser: true,
      user: e.detail.userInfo
    })
  }
})