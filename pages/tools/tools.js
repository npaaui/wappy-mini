// pages/tools/tools.js
var requests = require('../../utils/request.js');
var utils = require('../../utils/util.js');
var app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: e => {
          this.insertUser(e);
        }
      })
    }
  },
  
  getUserInfo: function (e) {
    this.insertUser(e);
  },

  insertUser: function (e) {
    var encrypted_data = e.detail.encryptedData
    var iv = e.detail.iv
    var session_key = wx.getStorageSync('session_key')
    var open_id = wx.getStorageSync('open_id')
    //新增用户
    requests.requestUserInsert({ session_key: session_key, open_id: open_id, encrypted_data: encrypted_data, iv: iv }, (data) => {
      app.globalData.userInfo = data;
      this.setData({
        userInfo: data,
        hasUserInfo: true
      })
    })
  },

  //跳转到详细页面
  toTomatoTime: function (e) {
    wx.navigateTo({
      url: '../tools-detail/tomato-time/tomato-time'
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})