const api = require('../../utils/api.js');
Page({
  data: {
    nbFrontColor: '#000000',
    nbBackgroundColor: '#ffffff',
    id:'',
    user_id:0,
    good:{},
    num:1,
    rootUrl:api.WxApiRoot,
    addressInfo: null,
    total_price:0,
    alert: false
  },
  onChange(event) {
    this.setData({
      num:event.detail
    })
  },
  onLoad(options) {
    var that = this
    this.setData({
      id:options.id
    })
  },
  onReady() {

  },
  onShow() {
    // 加载页面时根据id查询商品详情
    this.findDetail(this.data.id)
    console.log(this.data.total_price)
    var that = this
    //根据缓存判断用户是否已登录
    wx.getStorage({
      key: 'user',
      success: function(res) {
        that.setData({
            user_id: res.data.id
        })
      },
      fail: function(res){
        wx.switchTab({url:"/pages/user/index"})
      }
    })
  },
   //点击事件：通过id查找商品详情
  findDetail(id){
    var that = this
    wx.request({
      url: api.WxApiRoot+'good?id='+id, //接口地址
      success(res) {
        that.setData({
              good:res.data,
              total_price:res.data.price
       })
      }
    })
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
  //提交订单
  onSubmit(event){
    if(this.data.addressInfo == null){
      this.setData({
        alert: true
      })
    }else{
      wx.request({
        url: api.WxApiRoot+'buy/',
        data: {
          user_id: this.data.user_id,
          num: this.data.num,
          good: this.data.good,
          address_info: this.data.addressInfo
        },
        method: 'POST',
        success: function(res){
          var user = wx.getStorageSync('user');
          user.buy_num = parseInt(user.buy_num)+1;
          wx.setStorageSync('user', user);
          wx.navigateTo({
            url: '/pages/success/index?order_id=' + res.data.order_id
          })
        }
      })
    }
  },
  //分享
  onShareAppMessage() {
    return {
      title: '',
    };
  },
  //关闭提示框
  onCloseAlert() {
    this.setData({ alert: false });
  },
});