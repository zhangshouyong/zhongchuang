// pages/buyvip/buyvip.js
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    circular: true,
    previousMargin: 0,
    nextMargin: 0,
    img_urls: [
      "/assets/images/1.jpeg",
      "/assets/images/2.jpeg",
      "/assets/images/3.jpeg",
    ],
    interval: 5000,
    duration: 1000,
    num: 1,
    item: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let item = JSON.parse(options.data);
    let imgs = new Array();
    imgs.push(item.pic);
    this.setData({
      item: item,
      img_urls: imgs,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  jiaBtnTap: function (e) {
    console.log('jiaBtn');
    let count = this.data.num + 1;
    this.setData({
      num: count
    });
  },

  jianBtnTap: function (e) {
    let count = this.data.num;
    if (count <= 1) {
      return;
    }
    count--;
    this.setData({
      num: count
    });
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  /**
   * 立即购买
   */
  toFirmorder() {
    app.globalData.curOrder = {};
    let order = {};
    order.items = [];
    let item = {...this.data.item}
    item.number = this.data.num;
    order.items.push(item);
    order.state = 0;
    order.number = 1;
    app.globalData.curOrder = order;
    app.globalData.orderlist.push(order);
    wx.navigateTo({
      url: '/pages/firmorder/firmorder',
    })
  },

  /**
   * 加入购物车
   */
  addCart() {
    let item = {...this.data.item};
    item.number = this.data.num;
    item.option = 0;
    item.active = true;
    console.log("addCart item --->" + JSON.stringify(item))
    app.addCart(item);
    wx.showToast({
      title: '加入成功',
    })
  },

  /**
   * 打开购物车
   */
  toCart() {
    wx.switchTab({
      url: '/pages/cart/cart',
    })
  }
})