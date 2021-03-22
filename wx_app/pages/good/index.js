const api = require('../../utils/api.js');
Page({
  data: {
    id:'',
    rootUrl:api.WxApiRoot,
    good:{}
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
  onHide() {

  },
  onUnload() {

  },
  onShareAppMessage() {
    return {
      title: '',
    };
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
  //分享商品
  onShareAppMessage: function () {
    return {
     title: '弹出分享时显示的分享标题',
     desc: '分享页面的内容',
     path: '/pages/good/index?id='+this.data.id // 路径，传递参数到指定页面
    }
   }
});