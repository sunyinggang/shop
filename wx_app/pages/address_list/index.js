const api = require('../../utils/api.js');
//引入js文件
var event = require('../../utils/eventbus.js')
Page({
  data: {
    no_select: '',
    address_list:[],
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
    this.findOrderList(this.data.user_id)
  },
  //添加收货地址
  addAddress:function(){
    wx.navigateTo({
      url: '/pages/address/index?user_id=' + this.data.user_id
    })
  },
  // 根据用户id查询地址列表
  findOrderList(user_id){
    var that = this
    wx.request({
      url: api.WxApiRoot + 'address/list/?user_id=' + user_id, //接口地址
      success(res) {
        that.setData({
          address_list: res.data.address_list
        })
      }
    })
  },
  // 删除地址信息
  delAddress(e){
    var that = this
    var id = e.currentTarget.dataset.id;
    wx.request({
      url: api.WxApiRoot + 'address/del?id=' + id, //接口地址
      success(res) {
        that.setData({ 
          alert: true,
          alert_info: "删除成功！"
         });
      }
    })
  },
  // 选择地址信息
  selectAddress(e){
    var name = e.currentTarget.dataset.name;
    var phone = e.currentTarget.dataset.phone;
    var address = e.currentTarget.dataset.address;
    var info = {'name':name,'phone':phone,'address':address}
    event.pub('address', info)
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