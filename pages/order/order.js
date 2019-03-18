let app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    orderlist: [], //订单列表
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    let currentTab = 0;
    if (options.id) {
      currentTab = parseInt(options.id);
    }

    console.log("orderlist->" + JSON.stringify(app.globalData.orderlist))
    that.setData({
      currentTab: currentTab,
      orderlist: app.globalData.orderlist,
    });
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

  swichNav: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },

  getShowState() {
    let state = -1;
    switch(this.data.currentTab) {
      case 0:
        state = 0;
        break;
        case 1: 
        state = 1;
    }
    return state;
  },

  showOrderList() {
    let state = this.getShowState();
  }
})