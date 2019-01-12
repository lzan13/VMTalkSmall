//index.js
//获取应用实例
const app = getApp();
const util = require('../../utils/util.js');
const vlog = require('../../utils/vmlog.js');

Page({
  /**
   * 页面的初始数据
   */
  data: {
    isRefreshFinish: false,
    scrollHeight: 0,
    talk: {
      hitokoto: "慢慢来，一步一个脚印！",
      from: "『 lzan13 』"
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      scrollHeight: app.data.dimen.wHeight - app.data.dimen.navHeight,
      typeIndex: app.data.setting.typeIndex
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    this.requestTalk();
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

  /**
   * 触发下拉刷新
   */
  onRefresh: function() {
    this.setData({
      isRefreshFinish: false
    });
    // 请求数据
    this.requestTalk();
  },
  /**
   * 跳转到设置界面
   */
  onSetting: function() {
    wx.navigateTo({
      url: '../setting/setting'
    })
  },
  /**
   * 请求一句话
   */
  requestTalk: function() {
    let self = this;
    let index = app.data.setting.typeIndex;
    let type = app.data.setting.typeArray[index];
    wx.request({
      url: 'https://v1.hitokoto.cn',
      data: {
        c: type.type,
        encode: 'json',
        charset: 'utf-8'
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        res.data.from = util.formatStr("『 {from} 』", res.data);
        self.setData({
          talk: res.data,
          isRefreshFinish: true
        })
      },
      fail() {
        self.setData({
          isRefreshFinish: true
        })
      }
    })
  },
})