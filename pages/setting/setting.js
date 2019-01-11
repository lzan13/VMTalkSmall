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
      typeIndex: app.data.setting.typeIndex,
      typeArray: app.data.setting.typeArray
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

})