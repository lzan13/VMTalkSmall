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
    scrollHeight: 0,
    isRefreshFinish: false,
    talk: {
      hitokoto: "慢慢来，一步一个脚印！",
      from: "lzan13"
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      scrollHeight: app.common.wHeight - app.common.navHeight
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
    vlog.i("触发下拉刷新");
    this.setData({
      isRefreshFinish: false
    });
    // 模拟请求
    this.requestTalk();
  },

  /**
   * 跳转到设置界面
   */
  onSetting: function() {
    wx.navigateTo({
      url: '../me/me'
    })
  },
  /**
   * 请求一句话
   */
  requestTalk: function() {
    let self = this;
    wx.request({
      url: 'https://v1.hitokoto.cn',
      data: {
        c: 'a',
        encode: 'json',
        charset: 'utf-8'
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        setTimeout(() => {
          res.data.from = util.formatStr("『 {from} 』", res.data);
          self.setData({
            talk: res.data,
            isRefreshFinish: true
          })
        }, 1500);
      },
      fail() {
        self.setData({
          isRefreshFinish: true
        })
      }
    })
  },
})