// pages/demo/share/share/share.js
const vlog = require("../../../utils/vmlog.js");

var wWidth;
var wHeight;

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    create: {
      type: Boolean,
      value: false,
      observer: "_createShare"
    },
    content: {
      type: String,
      value: "慢慢来，一步一个脚印 👣 "
    },
    from: {
      type: String,
      value: "『 lzan13 』"
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isShow: false,
    cWidth: 0,
    cHeight: 0,
    shareImagePath: null,
  },

  /**
   * 组件生命周期方法
   */
  ready: function() {
    var that = this;
    wx.getSystemInfo({
      success: function(res) {
        wWidth = res.windowWidth;
        wHeight = res.windowHeight;
        that.setData({
          cWidth: wWidth,
          cHeight: wHeight,
          imageWidth: wWidth * 0.75,
          imageHeight: wHeight * 0.75
        })
      },
    })
    this.details = {
      x: 24,
      y: wHeight / 2,
      width: wWidth - 48,
      height: 24,
      line: 30,
      color: "#363636",
      size: 18,
      align: "left",
      baseline: "top",
      text: this.data.content,
      bold: true
    };
  },
  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 分享图片触发事件
     */
    _createShare: function(b) {
      if (b) {
        this._showLoading();
        this._drawShare();
      }
    },


    /**
     * 绘制分享内容
     */
    _drawShare: function() {
      var that = this;

      // 创建 canvas 对象
      const ctx = wx.createCanvasContext("shareCanvas", this);
      this.ctx = ctx;

      this._drawBackground();

      //绘制 content
      this.details.text = this.data.content;
      this._wrapText(this.details);

      //绘制 from
      this._drawFrom();

      //绘制到 canvas 上
      ctx.draw(false, function() {
        that._createImageFromCanvas();
      });
    },

    /**
     * 绘制背景
     */
    _drawBackground: function() {
      this.ctx.save();
      this.ctx.setFillStyle("#f8f8f8");
      this.ctx.fillRect(0, 0, wWidth, wHeight);
      this.ctx.restore();
    },

    /**
     * 绘制 from 文本
     */
    _drawFrom: function() {
      this.ctx.save();
      this.ctx.setFillStyle("#363636");
      this.ctx.setFontSize(14);
      this.ctx.setTextAlign("center");
      this.ctx.fillText(this.data.from, wWidth / 2, wHeight - 48);
      this.ctx.restore();
    },

    /**
     * 包装文本
     *
     * @param {Object} obj
     */
    _wrapText: function(obj) {
      let tr = this.getTextLine(obj);
      let lines = tr.length;

      for (let i = 0; i < lines; i++) {
        if (i < obj.line) {
          let txt = {
            x: obj.x,
            y: obj.y - (lines / 2 * obj.height) + (i * obj.height),
            color: obj.color,
            size: obj.size,
            align: obj.align,
            baseline: obj.baseline,
            text: tr[i],
            bold: obj.bold
          };
          if (i == obj.line - 1) {
            txt.text = txt.text.substring(0, txt.text.length - 2) + "...";
          }
          this._drawText(txt);
        }
      }
    },

    /**
     * 获取文本折行
     * @param {Object} obj
     * @return {Array} arrTr
     */
    getTextLine: function(obj) {
      this.ctx.setFontSize(obj.size);
      let arrText = obj.text.split("");
      let line = "";
      let arrTr = [];
      for (let i = 0; i < arrText.length; i++) {
        var testLine = line + arrText[i];
        var metrics = this.ctx.measureText(testLine);
        var width = metrics.width;
        if (width > obj.width && i > 0) {
          arrTr.push(line);
          line = arrText[i];
        } else {
          line = testLine;
        }
        if (i == arrText.length - 1) {
          arrTr.push(line);
        }
      }
      return arrTr;
    },


    /**
     * 绘制文本
     *
     * @param {Object} obj
     */
    _drawText: function(obj) {
      this.ctx.save();
      this.ctx.setFillStyle(obj.color);
      this.ctx.setFontSize(obj.size);
      this.ctx.setTextAlign(obj.align);
      this.ctx.setTextBaseline(obj.baseline);
      if (obj.bold) {
        this.ctx.font = "normal " + "bold " + obj.size + "px" + " sans-serif";
      }
      this.ctx.fillText(obj.text, obj.x, obj.y);
      this.ctx.restore();
    },

    /**
     * 生成图片
     */
    _createImageFromCanvas: function() {
      var that = this;
      wx.canvasToTempFilePath({
        canvasId: "shareCanvas",
        success: function(res) {
          console.log(res.tempFilePath);
          that.setData({
            shareImagePath: res.tempFilePath,
            isShow: true
          })
        },
        complete: function() {
          that._hideLoading();
        }
      }, this);
    },

    /**
     * 请求保存图片权限
     */
    _requestAlbumScope: function() {
      var that = this;
      wx.getSetting({
        success: res => {
          if (res.authSetting["scope.writePhotosAlbum"]) {
            // 已经授权，可以直接保存图片到相册，不会弹出授权窗口
            that._savePhotosAlbum();
          } else {
            wx.authorize({
              scope: "scope.writePhotosAlbum",
              success(res) {
                that._savePhotosAlbum();
              },
              fail() {
                that._showWritePhotosAlbumScope();
              }
            });
          }
        }
      });
    },

    /**
     * 保存到相册
     */
    _savePhotosAlbum: function() {
      var that = this;
      wx.saveImageToPhotosAlbum({
        filePath: that.data.shareImagePath,
        success: function() {
          wx.showToast({
            title: "✌️ 保存成功 😁 ",
            icon: "succes",
            duration: 3000
          })
        }
      })
    },

    /**
     * 弹出授权提示窗口
     */
    _showWritePhotosAlbumScope: function() {
      var that = this;
      wx.showModal({
        title: "提示",
        content: "你需要授权才能保存图片到相册",
        success: function(res) {
          if (res.confirm) {
            wx.openSetting({
              success: function(res) {
                if (res.authSetting["scope.writePhotosAlbum"]) {
                  that._savePhotosAlbum();
                } else {
                  //用户未同意保存图片权限
                }
              },
              fail: function() {
                //用户未同意保存图片权限
              }
            });
          }
        }
      });
    },

    // 显示加载框
    _showLoading: function() {
      wx.showLoading({
        title: "图片生成中...",
      })
    },
    // 隐藏加载框
    _hideLoading: function() {
      wx.hideLoading();
    },
    /**
     * 关闭分享
     */
    _closeShare: function() {
      this.setData({
        create: false,
        isShow: false
      });
    }
  }
})