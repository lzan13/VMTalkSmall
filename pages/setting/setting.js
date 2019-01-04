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
    hitokotoType: {},
    hitokotoTypes: [{
        type: '0',
        name: '随机'
      }, {
        type: 'a',
        name: '动画'
      },
      {
        type: 'b',
        name: '漫画'
      },
      {
        type: 'c',
        name: '游戏'
      },
      {
        type: 'd',
        name: '小说'
      },
      {
        type: 'e',
        name: '原创'
      },
      {
        type: 'f',
        name: '网络'
      },
      {
        type: 'g',
        name: '其他'
      }
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      sbHeight: app.data.dimen.sbHeight,
      navHeight: app.data.dimen.navHeight,
      hitokotoType: app.data.setting.hitokotoType
    });
  },

  /**
   * 选择器改变
   */
  bindPickerChange(e) {
    let selectType = this.data.hitokotoTypes[e.detail.value];
    app.data.setting.hitokotoType = selectType;
    wx.setStorageSync("hitokoto_type", selectType)
    this.setData({
      hitokotoType: selectType
    })
  },

})