var utils = require('../utils/util.js'); 
var api = require('./api.js');

module.exports = {
  requestLogin: requestLogin,
  requestUserDetail: requestUserDetail,
  requestUserInsert: requestUserInsert,
  requestUserUpdate: requestUserUpdate,
  requestArticleList: requestArticleList,
  requestArticleDetail: requestArticleDetail,
  requestCookingList: requestCookingList,
  requestCookingDetail: requestCookingDetail
}

/**
 * 登录
 */
function requestLogin(data, successCb, errorCb, completeCb) {
  request(api.API_LOGIN, 'GET', data, successCb, errorCb, completeCb);
}

/**
 * 获取用户
 */
function requestUserDetail(data, successCb, errorCb, completeCb) {
  request(api.API_USER, 'GET', data, successCb, errorCb, completeCb);
}

/**
 * 新增用户
 */
function requestUserInsert(data, successCb, errorCb, completeCb) {
  request(api.API_USER, 'POST', data, successCb, errorCb, completeCb);
}

/**
 * 修改用户
 */
function requestUserUpdate(data, successCb, errorCb, completeCb) {
  request(api.API_USER, 'PUT', data, successCb, errorCb, completeCb);
}

/**
 * 文章列表
 */
function requestArticleList(data, successCb, errorCb, completeCb) {
  request(api.API_ARTICLE_LIST, 'GET', data, successCb, errorCb, completeCb);
}

/**
 * 文章详情
 */
function requestArticleDetail(id, data, successCb, errorCb, completeCb) {
  request(api.API_ARTICLE_DETAIL.replace(':id', id), 'GET', data, successCb, errorCb, completeCb);
}

/**
 * 搜索菜谱
 */
function requestCookingList(data, successCb, errorCb, completeCb) {
  request(api.API_COOKING_LIST, 'GET', data, successCb, errorCb, completeCb);
}

/**
 * 获取菜谱详细信息
 */
function requestCookingDetail(id, data, successCb, errorCb, completeCb) {
  request(api.API_COOKING_DETAIL.replace(':id', id), 'GET', data, successCb, errorCb, completeCb);
}

/**
 * 网路请求
 */
function request(url, methed, data, successCb, errorCb, completeCb) {
  wx.request({
    url: url,
    method: methed,
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

