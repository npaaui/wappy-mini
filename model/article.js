var requests = require('../utils/request.js');

class article{
	getArticleList({count=5,page=1}){
	  return new Promise(resolve => {
		requests.requestArticleList({ page_size: count, page: page }, (data) => {
		  this.total_page = Math.ceil(data.count/count)
		  resolve({
			  total:data.count,
			  count:count,
			  total_page:this.total_page,
			  page:page,
			  items:data.list
		  })
		}, () => {
		  this.total = 0;
		}, () => {});
	  })
	}
  }

export { 
	article 
}