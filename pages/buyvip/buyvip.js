// pages/buyvip/buyvip.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    background: ['demo-text-1', 'demo-text-2', 'demo-text-3'],
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    circular: true,
    previousMargin: 0,
    nextMargin: 0,
    img_urls: [
      "/assets/images/jiu_1.jpg",
      "/assets/images/jiu_2.jpg",
      "/assets/images/jiu_3.jpg",
      "/assets/images/jiu_4.jpg",
    ],
    interval: 5000,
    duration: 1000,
    num: 1,
    goodsList: {
      saveHidden: true,
      totalPrice: 0,
      allSelect: true,
      noSelect: false,
      list: []
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  }
})