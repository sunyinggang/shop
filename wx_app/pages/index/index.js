const app = getApp()
const api = require('../../utils/api.js');

Page({
  data: {
    carousel: {
      imgs: [],
      currentIndex: 0
    },
    goods:[],
    rootUrl:api.WxApiRoot
  },
  onLoad:function() {
    var that =this;
    that.getCarouselImgs();
  },
  onShow() {
    this.getTabBar().init()
    this.getGoodsList()
  },
  getCarouselImgs:function (e) {
    var carousel = {}
    carousel.imgs = ["../../images/baner_1.png","../../images/baner_2.png","../../images/baner_3.png"]
    carousel.currentIndex = 0
    this.setData({
      carousel:carousel
    })
  },
  swiperChange:function (e) {
    var that =this;
    var carousel = that.data.carousel;
    carousel.currentIndex = e.detail.current;
    that.setData({
      carousel: carousel
    });
  },
  getGoodsList:function(){
    var that = this
    console.log(api.WxApiRoot+'list')
    wx.request({
      url: api.WxApiRoot+'list', //接口地址
      success(res) {
        that.setData({
              goods:res.data.list
            })
      }
    })
  }

});