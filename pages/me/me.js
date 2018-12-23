// pages/me/me.js
//获取应用实例
const app = getApp();
const vlog = require("../../utils/vmlog.js");

Page({
  /**
   * 页面的初始数据
   */
  data: {
    user: {},
    isLoadUser: false,
    sbHeight: 0,
    navHeight: 0,
    scrollHeight: 0,
    isRefreshFinish: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var self = this;
    const colors = this.generateColors(20);
    this.setData({
      sbHeight: app.common.sbHeight,
      navHeight: app.common.navHeight,
      scrollHeight: app.common.wHeight - app.common.navHeight
    });
    wx.getSystemInfo({
      success: function(res) {
        self.setData({
          colors
        });
      }
    });
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  randomColor: function() {
    return `rgba(${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)},${(Math.random() * 0.3 + 0.2).toFixed(1)})`;
  },

  generateColors: function(length) {
    return new Array(length).fill(null).map(() => this.randomColor());
  },

  /**
   * 触发下拉刷新
   */
  _onRefresh: function() {
    vlog.i("触发下拉刷新");
    this.setData({
      isRefreshFinish: false
    });
    // 模拟请求
    setTimeout(() => {
      vlog.i("下拉刷新模拟完成");
      this.setData({
        isRefreshFinish: true
      });
    }, 1000);
  }

})