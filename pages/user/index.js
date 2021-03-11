const app = getApp()

Page({
	data: {

	},

  onShow() {
    this.getTabBar().setData({
      active: 1
    })
  }
})
