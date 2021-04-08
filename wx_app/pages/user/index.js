const app = getApp()
const api = require('../../utils/api.js');
Page({
  data: {
    show: false,
    showRegister: false,
    phone: '',
    password: '',
    two_password: '',
    admin_show: '',
    admin_token: '',
    user: null,
    alert: false,
    alert_info: '',
    age: '',
    age_show: false,
    email: ''
  },
  // 打开登录框
  getPhoneNumber: function () {
    this.setData({ show: true });
  },
  // 打开注册框
  register: function () {
    this.setData({ showRegister: true });
  },
  //登录
  login: function () {
    var that = this
    wx.request({
      url: api.WxApiRoot + 'login?phone=' + this.data.phone + '&password=' + this.data.password, //接口地址
      success(res) {
        if(res.data.code == 101){
          that.setData({ 
            alert: true,
            alert_info: "手机号未注册，请先注册！"
           });
        }else if(res.data.code == 102){
          that.setData({ 
            alert: true,
            alert_info: "密码错误，请从重新输入！"
           });
        }else{
          that.setData({
            user: res.data.user
          })
          wx.setStorage({
            key: "user",
            data: res.data.user
          })
        }
      }
    })
  },
  //注册
  confirmRegister: function () {
    var type="^[0-9]*[1-9][0-9]*$"; 
    var re = new RegExp(type);
    var email_reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
    if(this.data.password != this.data.two_password){
      this.setData({ 
        alert: true,
        alert_info: "两次密码不一致，请重新注册"
       });
    }else if(this.data.age.match(re)==null){
      this.setData({ 
        alert: true,
        alert_info: "年龄格式不正确，请输入大于零的整数!"
       });
    }else if(!email_reg.test(this.data.email)){
      this.setData({ 
        alert: true,
        alert_info: "邮箱格式不正确，请重新输入!"
       });
    }else{
      var that = this
      wx.request({
        url: api.WxApiRoot + 'register?phone=' + this.data.phone + '&password=' + this.data.password+'&age=' + this.data.age+'&email=' + this.data.email, //接口地址
        success(res) {
          if(res.data.code == 100){
            that.setData({ 
              alert: true,
              alert_info: "手机号已注册，请直接登录！"
             });
          }else{
            that.setData({
              user: res.data.user
            })
            console.log(res.data.user)
            wx.setStorage({
              key: "user",
              data: res.data.user
            })
            that.setData({ 
              alert: true,
              alert_info: "注册成功！"
             });
          }
        }
      })
    }
  },
  // 跳转到订单列表页
  getOrderList: function(){
    if(this.data.user == null){
      this.setData({ 
        alert: true,
        alert_info: "请先进行登录"
       });
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
  // 退出登录
  quit(){
    wx.clearStorage()
    this.setData({
      user: null
    })
    wx.switchTab({
      url: '/pages/index/index',
    })
  },
  // 关闭登录窗口
  onClose() {
    this.setData({ show: false });
  },
  // 关闭注册窗口
  onCloseRegister() {
    this.setData({ showRegister: false });
  },
  // 打开管理员口令窗口
  openAdmin() {
    this.setData({ admin_show: true });
  },
  // 关闭管理员口令窗口
  onCloseAdmin() {
    this.setData({ admin_show: false });
  },
  // 进入到管理员界面
  intoAdmin() {
    if(this.data.admin_token == 'admin'){
      wx.navigateTo({
        url: '/pages/admin/index'
      })
    }else{
      this.setData({ 
        alert: true,
        alert_info: "口令错误"
       });
    }
  },
  //打开修改年龄窗口
  openAge(){
    this.setData({
      age_show:true
    })
  },
  // 修改年龄
  editAge(){
    var that = this
    wx.request({
      url: api.WxApiRoot + 'edit/age/?user_id=' + this.data.user.id + '&age=' + this.data.age, //接口地址
      success(res) {
        console.log(res.data.age)
        that.setData({
          age: res.data.age
        })
      }
    })
    var user = wx.getStorageSync('user');
    user.age = this.data.age;
    wx.setStorageSync('user', user);
    this.onShow()
  },
  // 关闭修改年龄窗口
  onCloseAge(){
    this.setData({
      age_show:false
    })
  },
  onShow() {
    this.getTabBar().setData({
      active: 1
    })
    var that = this
    if(!wx.getStorageSync('user')){
      this.setData({ 
        alert: true,
        alert_info: "请先进行登录"
       });
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
  // 关闭提示框
  onCloseAlert() {
    this.setData({ alert: false });
  },
})
