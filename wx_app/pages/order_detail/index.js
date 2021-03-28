const api = require('../../utils/api.js');
Page({
  data: {
    nbFrontColor: '#000000',
    nbBackgroundColor: '#ffffff',
    rootUrl:api.WxApiRoot,
    order_id: 0,
    order_detail: null
  },
  onLoad(options) {
    this.setData({
      order_id:options.order_id
    })
  },
  onShow() {
    this.findOrderDetail(this.data.order_id)
  },
  //根据订单id查询订单详情信息
  findOrderDetail(order_id){
    var that = this
    wx.request({
      url: api.WxApiRoot + '/order/detail/?id=' + order_id, //接口地址
      success(res) {
        console.log(res.data)
        that.setData({
          order_detail: res.data
        })
      }
    })
  }
});