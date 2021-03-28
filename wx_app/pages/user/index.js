const app = getApp()
const api = require('../../utils/api.js');
Page({
  data: {
    show: false,
    phone: '',
    sms: '',
    user: null,
    alert: false
  },
  //通过绑定手机号登录
  getPhoneNumber: function () {
    this.setData({ show: true });
  },
  //发送验证码
  sendSms: function () {
    console.log(this.data.phone)
  },
  //登录
  login: function () {
    var that = this
    wx.request({
      url: api.WxApiRoot + 'login?phone=' + this.data.phone + '&num=' + this.data.sms, //接口地址
      success(res) {
        console.log(res.data.user)
        that.setData({
          user: res.data.user
        })
        wx.setStorage({
          key: "user",
          data: res.data.user
        })
      }
    })
  },
  // 跳转到订单列表页
  getOrderList: function(){
    if(this.data.user == null){
      this.setData({ alert: true });
    }else{
      wx.navigateTo({
        url: '/pages/order_list/index?user_id=' + this.data.user.id
      })
    }
  },
 //选择收货地址，调用微信自带的收货地址
  chooseAddress() {
    wx.chooseAddress({
      success: (res) => {
        this.setData({
          addressInfo: res
        })
      },
      fail: function(err) {
        console.log(err)
      }
    })
  },
  onClose() {
    this.setData({ show: false });
  },
  onShow() {
    this.getTabBar().setData({
      active: 1
    })
    var that = this
    if(!wx.getStorageSync('user')){
      this.setData({ alert: true });
    }else{
      wx.getStorage({
        key: 'user',
        success (res) {
          that.setData({
            user: res.data
          })
        }
      })
    }
  },
  onCloseAlert() {
    this.setData({ alert: false });
  },
})
