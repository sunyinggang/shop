const api = require('../../utils/api.js');
Page({
  data: {
    user_id:0,
    name:'',
    phone:'',
    address:'',
    alert: false,
    alert_info:''
  },
  onLoad(options) {
    this.setData({
      user_id:options.user_id
    })
  },
  onReady() {

  },
  onShow() {

  },
  // 添加收货地址
  addAddress(){
    var that = this
    wx.request({
      url: api.WxApiRoot + '/address/add/?user_id=' + this.data.user_id+'&name=' +this.data.name+'&phone=' +this.data.phone+'&address=' +this.data.address, //接口地址
      success(res) {
        that.setData({ 
          alert: true,
          alert_info: "添加成功！"
         });
      }
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