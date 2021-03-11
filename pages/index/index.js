const app = getApp()


Page({
  data: {
    carousel: {
      imgs: [],
      currentIndex: 0
    },
    goods:[
      {"title":"123","price":"35.00","img_url":"https://img.yzcdn.cn/vant/cat.jpeg"},
      {"title":"234","price":"35.00","img_url":"https://img.yzcdn.cn/vant/cat.jpeg"},
      {"title":"543","price":"35.00","img_url":"https://img.yzcdn.cn/vant/cat.jpeg"},
      {"title":"245","price":"35.00","img_url":"https://img.yzcdn.cn/vant/cat.jpeg"}
    ]
  },
  onLoad:function() {
    var that =this;
    that.getCarouselImgs();
  },
  onShow() {
    this.getTabBar().init();
  },
  getCarouselImgs:function (e) {
    var carousel = {}
    carousel.imgs = ["https://img.yzcdn.cn/vant/cat.jpeg","https://img.yzcdn.cn/vant/cat.jpeg"]
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
  }
});