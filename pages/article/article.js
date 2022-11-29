import { article } from '../../model/article.js'

Page({
  data: {
    loadingEnd: false,  // 是否loading完
    loading: false, // loading的状态
    articles: [], // 展示的数据
    articleModel: null, // Article类创建的对象模型
    currentPage: 1, // 当请求页的设置
    pageCount: 5, // 每页请求数据的数量
  },

  async onLoad(options) {
    const articleModel = new article();
    articleModel.getArticleList({
      count: this.data.pageCount,
      page: this.data.currentPage
    }).then(res => {
      this.setData({
        articleModel,
        articles: res
      });
      console.log(this.data.articles);
      this.renderWaterFlow();
    })
  },
  renderWaterFlow() {
    wx.lin.renderWaterFlow(this.data.articles.items, false, () => {
      console.log('渲染成功')
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
      if (this.data.currentPage >= this.data.articleModel.total_page) {
        this.setData({
          loadingEnd: true,
          loading: false,
        });
      } else {
        this.setData({
          loading: true,
          currentPage: this.data.currentPage + 1,
        });
        setTimeout(() => {
          this.getPageArticleList()
        }, 2000)
      }
  },
  async getPageArticleList() {
    this.data.articleModel.getArticleList({
      count: this.data.pageCount,
      page: this.data.currentPage
    }).then(res => {
      this.articles = res
      this.renderWaterFlow();
    })
  },
})