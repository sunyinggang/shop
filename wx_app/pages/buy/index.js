const api = require('../../utils/api.js');
Page({
  data: {
    nbFrontColor: '#000000',
    nbBackgroundColor: '#ffffff',
    id:'',
    good:{},
    num:0,
    rootUrl:api.WxApiRoot,
    addressInfo: null
  },
  onChange(event) {
    this.setData({
      num:event.detail
    })
  },
  onLoad(options) {
    this.setData({
      id:options.id
    })

  },
  onReady() {

  },
  onShow() {
    this.findDetail(this.data.id)
  },
   //点击事件：通过id查找商品详情
  findDetail(id){
    var that = this
    wx.request({
      url: api.WxApiRoot+'good?id='+id, //接口地址
      success(res) {
        that.setData({
              good:res.data
       })
      }
    })
  },
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
  onHide() {

  },
  onUnload() {

  },
  onShareAppMessage() {
    return {
      title: '',
    };
  },
});