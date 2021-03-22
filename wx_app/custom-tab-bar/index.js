Component({
	data: {
		active: 0,
		list: [
			{
				icon: 'bag-o',
				text: '商品',
				url: '/pages/index/index'
			},
			{
				icon: 'user-o',
				text: '我的',
				url: '/pages/user/index'
			}
		]
	},

	methods: {
    onChange(event) {
			this.setData({ active: event.detail });
			wx.switchTab({
				url: this.data.list[event.detail].url
			});
		},
    init() {
			const page = getCurrentPages().pop();
			this.setData({
				active: this.data.list.findIndex(item => item.url === `/${page.route}`)
			});
		}
	}
});
