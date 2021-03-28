const api = require('../../utils/api.js');
Page({
  data: {
    user_id:0,
    order_list:[],
    rootUrl:api.WxApiRoot
  },
  onLoad(options) {
    this.setData({
      user_id:options.user_id
    })
  },
  onReady() {

  },
  onShow() {
    this.findOrderList(this.data.user_id)
  },
  // 根据用户id查询订单列表
  findOrderList(user_id){
    var that = this
    wx.request({
      url: api.WxApiRoot + '/order/list/?user_id=' + user_id, //接口地址
      success(res) {
        console.log(res.data.list)
        that.setData({
          order_list: res.data.list
        })
      }
    })
  },
  //跳转到详情页面
  toOrderDetail: function(e){
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/order_detail/index?order_id=' + id
    })
  }
});