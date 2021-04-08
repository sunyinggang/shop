const api = require('../../utils/api.js');
Page({
  data: {
    activeName: '1',
    label_list: [],
    showLabel: false,
    title: '',
    context: '',
    alert_info: '',
    alert: false,
    showType: false,
    columns: ['潜在客户', '基础客户', '一般客户', '重点客户'],
    type: '基础客户'
  },
  onLoad(options) {

  },
  onReady() {
    this.getLabelsList()
  },
  onShow() {
    
  },
  // 查询标签列表
  getLabelsList() {
    var that = this
    wx.request({
      url: api.WxApiRoot+'label/list/', //接口地址
      success(res) {
        that.setData({
          label_list:res.data.list
        })
      }
    })
  },
  //打开修改页
  labelOpen() {
    var that = this
    wx.request({
      url: api.WxApiRoot+'label/detail?id='+this.data.activeName, //接口地址
      success(res) {
        that.setData({
          title:res.data.title,
          context:res.data.context
        })
      }
    })
    this.setData({
      showLabel: true,
    });
  },
  //关闭修改页
  labelClose() {
    this.setData({
      showLabel: false,
    });
  },
  //修改标签信息
  editLabel() {
    var that = this
    wx.request({
      url: api.WxApiRoot+'label/edit/',
      data: {
        id: this.data.activeName,
        title: this.data.title,
        context: this.data.context
      },
      method: 'POST',
      success: function(res){
        that.onReady()
        that.setData({ 
          alert: true,
          alert_info: "修改成功"
         });
      }
    })
  },
  // 点击下拉框
  onChange(event) {
    this.setData({
      activeName: event.detail,
    });
  },
  //关闭提示框
  onCloseAlert() {
    this.setData({ alert: false });
  },
  //打开发送短信页面
  typeOpen() {
    this.setData({ showType: true });
  },
  //关闭发送短信页面
  typeClose() {
    this.setData({ showType: false });
  },
  // 选择用户类型
  onChangeType(event){
    const { index } = event.detail;
    this.setData({ type: this.data.columns[index] });
  },
  //发送短信
  sendEmail(){
    var that = this
    wx.request({
      url: api.WxApiRoot+'send/email?type='+this.data.type, //接口地址
      success(res) {
        that.setData({ 
          alert: true,
          alert_info: "修改成功"
         });
      }
    })
  }
});