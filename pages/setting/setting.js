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
    objectArray: [{
        id: '0',
        name: '随机'
      }, {
        id: 'a',
        name: '动画'
      },
      {
        id: 'b',
        name: '漫画'
      },
      {
        id: 'c',
        name: '游戏'
      },
      {
        id: 'd',
        name: '小说'
      },
      {
        id: 'e',
        name: '原创'
      },
      {
        id: 'f',
        name: '网络'
      },
      {
        id: 'g',
        name: '其他'
      }
    ],
    index: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let self = this;
    this.setData({
      sbHeight: app.common.sbHeight,
      navHeight: app.common.navHeight
    });
  },

  bindPickerChange(e) {
    this.setData({
      index: e.detail.value
    })
  },

})