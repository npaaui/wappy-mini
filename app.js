//app.js
var requests = require('./utils/request.js');
var utils = require('./utils/util.js');
var app = getApp();

App({
  onLaunch: function () {
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台鉴权
        if(res.code) {
          requests.requestLogin({ login_type: 'wechat', wx_code: res.code}, (data) => {
            wx.setStorageSync('token', data.token)
            this.globalData.userInfo = data.user;
            this.globalData.token = data.token;
            
            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            if (this.userInfoReadyCallback) {
              this.userInfoReadyCallback(data);
            }
          })
        }
      }
    })
  },

  globalData: {
    userInfo: null,
    token: "",
  }
})    