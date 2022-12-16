const API_BASE = "http://127.0.0.1:8090/api/v1";

module.exports = {
  API_LOGIN: API_BASE + "/login",
  API_USER: API_BASE + "/user",
  API_ARTICLE_LIST: API_BASE + "/article",
  API_ARTICLE_DETAIL: API_BASE + "/article/:id",
  API_COOKING_LIST: API_BASE + "/cooking",
  API_COOKING_DETAIL: API_BASE + "/cooking/:id"
}