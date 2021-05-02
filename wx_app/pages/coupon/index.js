const api = require('../../utils/api.js');
//引入js文件
var event = require('../../utils/eventbus.js')
Page({
  data: {
    no_select: '',
    coupon_list:[],
    user_id: 0,
    alert: false,
    alert_info:''
  },
  onLoad(options) {
    this.setData({
      user_id:options.user_id,
      no_select:options.no_select
    })
  },
  onReady() {

  },
  onShow() {
    this.findCouponList(this.data.user_id)
  },
  //添加收货地址
  addAddress:function(){
    wx.navigateTo({
      url: '/pages/address/index?user_id=' + this.data.user_id
    })
  },
  // 根据用户id查询优惠券列表
  findCouponList(user_id){
    var that = this
    wx.request({
      url: api.WxApiRoot + 'coupon/list?user_id=' + user_id, //接口地址
      success(res) {
        that.setData({
          coupon_list: res.data.list
        })
      }
    })
  },
  // 选择优惠券
  selectCoupon(e){
    var id = e.currentTarget.dataset.id;
    var al = e.currentTarget.dataset.al;
    var les = e.currentTarget.dataset.les;
    var info = {'id':id,'al':al,'les':les}
    event.pub('coupon', info)
    wx.navigateBack({
      detla: -1
    })
  },
  // 关闭提示框
  onCloseAlert() {
    this.setData({ alert: false });
    wx.redirectTo({
        url: '/pages/address_list/index?user_id=' + this.data.user_id
    })
  },
});