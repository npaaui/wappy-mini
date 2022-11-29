//app.js
var requests = require('./utils/request.js');
var utils = require('./utils/util.js');
var app = getApp();

App({
  onLaunch: function () {
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if(res.code) {
          var appid = this.globalData.appid
          var secret = this.globalData.secret
          var url = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appid + '&secret=' + secret + '&js_code=' + res.code + '&grant_type=authorization_code';
          wx.request({
            url: url,
            data: {},
            method: 'GET', 
            success: res => {
              var openid = res.data.openid
              wx.setStorageSync('session_key', res.data.session_key)
              wx.setStorageSync('open_id', openid)
              //获取用户信息
              requests.requestUserDetail({ openId: openid, isLogin:true }, (data) => {
                this.globalData.userInfo = data;
                // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                if (this.userInfoReadyCallback) {
                  this.userInfoReadyCallback(data);
                }
              })
              
            }  
          })
        }
      }
    })
  },

  globalData: {
    userInfo: null,
    appid: "wxdffa5183841ebfd7",
    secret: "dfb7a8d8fd977bd3e6d4b63bd3a26df7",
  }
})    