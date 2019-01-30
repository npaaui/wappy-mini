var utils = require('../utils/util.js'); 
var api = require('./api.js');

/**
 * 网路请求
 */
function request(url, data, successCb, errorCb, completeCb) {
  wx.request({
    url: url,
    method: 'GET',
    data: data,
    success: function (res) {
      if (res.statusCode == 200)
        if (res.data.error > 0)
          console.log(res.data.msg, res); 
        else
          utils.isFunction(successCb) && successCb(res.data.data);
      else
        console.log('请求异常', res);
    },
    error: function () {
      utils.isFunction(errorCb) && errorCb();
    },
    complete: function () {
      utils.isFunction(completeCb) && completeCb();
    }
  });
}

/**
 * 搜索菜谱
 */
function requestCookingList(data, successCb, errorCb, completeCb) {
  request(api.API_COOKING_LIST, data, successCb, errorCb, completeCb);
}

/**
 * 获取菜谱详细信息
 */
function requestCookingDetail(id, data, successCb, errorCb, completeCb) {
  request(api.API_COOKING_DETAIL.replace(':id', id), data, successCb, errorCb, completeCb);
}

module.exports = {
  requestCookingList: requestCookingList,
  requestCookingDetail: requestCookingDetail
}

