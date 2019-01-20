//index.js
//获取应用实例
const app = getApp();
const vutil = require('../../utils/vmutil.js');
const vlog = require('../../utils/vmlog.js');

Page({
  /**
   * 页面的初始数据
   */
  data: {
    isRefreshFinish: false,
    scrollHeight: 0,
    showFrom: true,
    theme: {},
    talk: {
      hitokoto: "慢慢来，一步一个脚印！",
      from: "『 lzan13 』"
    },
    share: {
      create: false,
      content: "",
      from: ""
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      scrollHeight: app.data.dimen.wHeight - app.data.dimen.navHeight,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    this.requestTalk();
  },

  /**
   * 生命周期函数--页面显示/切入前台时触发。
   */
  onShow: function() {
    this.setData({
      showFrom: app.data.setting.showFrom,
      theme: app.data.setting.themeArray[app.data.setting.themeIndex]
    });
  },

  /**
   * 触发下拉刷新
   */
  handleRefresh: function() {
    this.setData({
      isRefreshFinish: false
    });
    // 请求数据
    this.requestTalk();
  },

  /**
   * 跳转到设置界面
   */
  handleSetting: function() {
    wx.navigateTo({
      url: '../setting/setting'
    })
  },

  /**
   * 触发复制
   */
  handleCopy: function() {
    let that = this;
    wx.setClipboardData({
      data: that.data.talk.hitokoto,
      success: function(res) {
        wx.showToast({
          title: "✌️ 复制成功 😁 ",
          icon: "succes",
          duration: 2000
        })
      }
    });
  },

  /**
   * 触发分享
   */
  handleShare: function() {
    this.setData({
      share: {
        create: true,
        content: this.data.talk.hitokoto,
        from: this.data.showFrom ? this.data.talk.from : ""
      }
    });
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
        res.data.from = vutil.formatStr("『 {from} 』", res.data);
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