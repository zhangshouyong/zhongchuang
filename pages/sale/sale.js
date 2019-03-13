// pages/sale/sale.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    commission: 0,
    totalSale: 0,
    orderCnt: 1,
    income: 422.00,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.setData({
      commission: app.getCommission(),
      totalSale: app.getTotalSale(),
    });
    /*
    app.getUserInfo(this.test).then(userInfo => {
      //更新数据
      wx.setNavigationBarTitle({
        title: userInfo.nickName
      })
      console.log(userInfo)
    })
    */
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
  /**
   * 我的销售订单
   */
  toMyPayOrder: function() {
    wx.navigateTo({
      url: '/pages/payorder/payorder',
    });
  },
  /**
   * 我的收入
   */
  toMyIncome: function() {
    wx.navigateTo({
      url: '/pages/income/income',
    });
  },
  /**
   * 我的团队
   */
  toMyTeam: function() {
    wx.navigateTo({
      url: '/pages/team/team',
    });
  },
  /**
   * 我的二维码
   */
  toMyTwo: function() {
    wx.navigateTo({
      url: '/pages/two/two',
    });
  }
})