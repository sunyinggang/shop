Page({
  data: {
    order_id: 0
  },
  onLoad(options) {
    this.setData({
      order_id:options.order_id
    })
  },
  onReady() {

  },
  onShow() {

  },
  toIndex(){
    wx.switchTab({
      url: '/pages/index/index'
    })    
  },
  orderDetail(){
    var id = this.data.order_id
    wx.navigateTo({
      url: '/pages/order_detail/index?order_id=' + id
    })
  }
});