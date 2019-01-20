// pages/me/me.js
//获取应用实例
const app = getApp();
const vlog = require("../../utils/vmlog.js");

Page({
  /**
   * 页面的初始数据
   */
  data: {
    sbHeight: 0,
    navHeight: 0,
    showThemeDialog: false,
    showFrom: true,
    themeIndex: 0,
    themeArray: [],
    typeIndex: 0,
    typeArray: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      sbHeight: app.data.dimen.sbHeight,
      navHeight: app.data.dimen.navHeight,
      showFrom: app.data.setting.showFrom,
      typeIndex: app.data.setting.typeIndex,
      typeArray: app.data.setting.typeArray,
      themeIndex: app.data.setting.themeIndex,
      themeArray: app.data.setting.themeArray
    });
  },

  /**
   * 选择器改变
   */
  bindPickerChange(e) {
    let index = e.detail.value;
    app.data.setting.typeIndex = index;
    wx.setStorageSync("key_type_index", index)
    this.setData({
      typeIndex: index
    })
  },

  /**
   * 选择主题
   */
  themeDialog: function() {
    this.setData({
      showThemeDialog: true
    });
  },

  /**
   * 选择主题
   */
  selectTheme: function(e) {
    let index = e.target.dataset.id;
    app.data.setting.themeIndex = index;
    wx.setStorageSync("key_theme_index", index)
    this.setData({
      themeIndex: index
    })
  },

  /**
   * 显示出处开关
   */
  showFrom: function() {
    let show = !this.data.showFrom;
    app.data.setting.showFrom = show;
    wx.setStorageSync("key_show_from", show)
    this.setData({
      showFrom: show
    })
  },
  /**
   * 打开关于弹窗
   */
  openAbout: function() {
    wx.showModal({
      content: "VMTalk，一句经典话语，涵盖动画、漫画、游戏、小说、网络、原创等各种经典话语，后期会有每日精选图等 \n\n 自己的第一个小程序，希望大家喜欢 😁 \n\n 可以随时联系我 ",
      showCancel: false,
      success: function(res) {

      }
    });
  }

})