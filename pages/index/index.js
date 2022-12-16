//index.js
var requests = require('../../utils/request.js');

//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUseGetUserProfile: false,
  },

  onLoad: function () {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }

    // 用户信息处理
    var userAuthFlag = false
    if (app.globalData.userInfo) {
      if (app.globalData.userInfo.head_img != "") {
        userAuthFlag = true
      }
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: userAuthFlag
      })
    } else {
      // 由于 requestLogin 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        if (app.globalData.userInfo.head_img != "") {
          userAuthFlag = true
        }
        this.setData({
          userInfo: res.user,
          hasUserInfo: userAuthFlag
        })
      }
    }
  },

  // 首页按钮触发获取用户信息（新接口）
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
    wx.getUserProfile({
      desc: '用于个人信息展示', // 声明获取用户个人信息后的用途，后续会展示在弹窗中
      success: (res) => {
        var param = { 
          id: app.globalData.userInfo.id, 
          head_img: res.userInfo.avatarUrl, 
          nickname: res.userInfo.nickName,
        }
        requests.requestUserUpdate(param, (data) => {
          this.setData({
            userInfo: data,
            hasUserInfo: true
          })
        })
      }
    })
  },

  // 首页按钮触发获取用户信息（老接口）
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    var param = { 
      id: app.globalData.userInfo.id, 
      head_img: e.detail.userInfo.avatarUrl, 
      nickname: e.detail.userInfo.nickName,
    }
    requests.requestUserUpdate(param, (data) => {
      this.setData({
        userInfo: data,
        hasUserInfo: true
      })
    })
  },
})
