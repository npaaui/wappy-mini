var requests = require('../../utils/request.js');
var utils = require('../../utils/util.js');

Page({
  data: {
    id: null,
    loadidngHidden: false,
    cookingData: null
  },
  onLoad: function (option) {
    this.setData({
      id: option.id
    });
  },
  onReady: function () {
    var id = this.data.id;
    var _this = this;
    requests.requestCookingDetail(
      id,
      { fields: 'image,summary,publisher,title,rating,pubdate,author,author_intro,catalog' },
      (data) => {
        _this.setData({
          cookingData: data
        });
      }, () => {
        wx.navigateBack();
      }, () => {
        _this.setData({
          loadidngHidden: true
        });
      });
  }
});