//app.js
const vlog = require("./utils/vmlog.js");
/**
 * 小程序入口，唯一的一个实例
 */
App({
  /**
   * 配置全局参数
   */
  data: {
    dimen: {
      sbHeight: 24,
      tbHeight: 48,
      navHeight: 72,
      wWidth: 375, // 这个是以 375*667 为基准进行预设
      wHeight: 667, // 这个是以 375*667 为基准进行预设
    },
    setting: {
      showFrom: true,
      themeIndex: 0,
      themeArray: [{
          id: 0,
          text: '#2c2a2d',
          cover: '#ede7d1',
        },
        {
          id: 1,
          text: '#ffffff',
          cover: '#2c2a2d'
        }, {
          id: 2,
          text: "#ffffff",
          cover: "#00a77b"
        }, {
          id: 3,
          text: "#ffffff",
          cover: "#f79798"
        }, {
          id: 4,
          text: "#ffffff",
          cover: "#ee5662"
        }, {
          id: 5,
          text: "#ffffff",
          cover: "#dbb85e"
        }
      ],
      typeIndex: 0,
      typeArray: [{
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
    }
  },

  onLaunch: function() {
    /**
     * 展示本地存储能力
     */
    this.data.setting.themeIndex = wx.getStorageSync("key_theme_index") || 0;
    this.data.setting.typeIndex = wx.getStorageSync("key_type_index") || 0;
    this.data.setting.showFrom = wx.getStorageSync("key_show_from");

    /**
     * 获取手机系统信息
     */
    wx.getSystemInfo({
      success: res => {
        vlog.i(res);
        //导航高度
        this.data.dimen.sbHeight = res.statusBarHeight;
        this.data.dimen.navHeight = this.data.dimen.sbHeight + this.data.dimen.tbHeight;
        this.data.dimen.wWidth = res.windowWidth;
        this.data.dimen.wHeight = res.windowHeight;
      },
      fail(err) {
        vlog.i(err);
      }
    })
  },
})