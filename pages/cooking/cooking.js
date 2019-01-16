//cooking.js
var app = getApp();
Page({
  data: {
    cookingList: []
  },

  onLoad: function () {
    //获取烹饪列表
    var cookingUrl = app.globalData.myHost + "/cooking/list";
    this.getCookingList(cookingUrl);
  },

  //调用烹饪api
  getCookingList: function (url) {
    var that = this;
    wx.request({
      url: url,
      method: 'GET',
      header: {
        "Content-Type": "json"
      },
      success: function (res) {
        that.setData({
          cookingList: res.data,
        })
      },
      fail: function (error) {
        console.log(error)
      }
    })
  }
})