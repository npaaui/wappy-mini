//cooking.js
var requests = require('../../utils/request.js');
var utils = require('../../utils/util.js');
var app = getApp();

//刷新动态球颜色
var iconColor = [
  '#42BD56', '#31A040'
];

Page({
  data: {
    scrollHeight: 0, //scroll-view高度
    pageIndex: 1, //页码
    totalRecord: 0, //菜谱总数
    isInit: true, //是否第一次进入应用
    loadingMore: false, //是否正在加载更多
    footerIconColor: iconColor[0], //下拉刷新球初始颜色
    searchKey: '', //搜索关键字
    cookingList: []
  },

  //页面显示获取设备屏幕高度，以适配scroll-view组件高度
  onShow: function () {
    wx.getSystemInfo({
      success: (res) => {
        console.log(res)
        this.setData({
          scrollHeight: res.windowHeight
          //scrollHeight: res.windowHeight - (100 * res.windowWidth / 750)
        });
      }
    })
  },

  //搜索输入框输入取值
  searchInputEvent: function (e) {
    this.setData({ searchKey: e.detail.value });
  },

  //搜索按钮点击事件
  searchClickEvent: function (e) {
    // if (!this.data.searchKey) {
    //   return;
    // }
    this.setData({ searchKey: e.detail.value });
    this.setData({ pageIndex: 0, cookingList: [] });
    requestData.call(this);
  },

  //下拉请求数据
  scrollLowerEvent: function (e) {
    if (this.data.loadingMore)
      return;
    requestData.call(this);
  },

  //跳转到详细页面
  toDetailPage: function (e) {
    var bid = e.currentTarget.dataset.bid; //菜谱id [data-bid]
    wx.navigateTo({
      url: '../cooking-detail/cooking-detail?id=' + bid
    });
  },

  onLoad: function () {
    //获取烹饪列表
    requestData.call(this);
  }
})

/**
 * 请求菜谱列表
 */
function requestData() {
  var _this = this;
  var q = this.data.searchKey;
  var page = this.data.pageIndex;

  this.setData({ loadingMore: true, isInit: false });
  updateRefreshBall.call(this);
  console.log(page)
  requests.requestCookingList({ q: q, page: page }, (data) => {
    if (data.total == 0) {
      //没有记录
      _this.setData({ totalRecord: 0 });
    } else {
      _this.setData({
        cookingList: _this.data.cookingList.concat(data.list),
        pageIndex: page + 1,
        totalRecord: data.total
      });
    }
  }, () => {
    _this.setData({ totalRecord: 0 });
  }, () => {
    _this.setData({ loadingMore: false });
  });
}

/**
 * 刷新下拉效果变色球
 */
function updateRefreshBall() {
  var cIndex = 0;
  var _this = this;
  var timer = setInterval(function () {
    if (!_this.data['loadingMore']) {
      clearInterval(timer);
    }
    if (cIndex >= iconColor.length)
      cIndex = 0;
    _this.setData({ footerIconColor: iconColor[cIndex++] });
  }, 300);
}