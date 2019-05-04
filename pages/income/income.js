// pages/income/income.js
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    commission_total: 0,
    sale_total: 0,
    commission_balance: 0,
    active_balance: 0,
    team_balance: 0,
    drawmoneyCnt: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      commission_total: app.getCommission(),
      sale_total: app.getTotalSale(),
      commission_balance: app.getCommissionBalance(),
      active_balance: app.getActiveBalance(),
      team_balance: app.getTeamBalance()
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
  /**
   * 提现
   */
  toDrawMoney() {
    wx.navigateTo({
      url: '/pages/drawmoney/drawmoney',
    });
  },
  /**
   * 全部提现
   */
  drawmoneyAll: function() {
    let count = this.data.subActive+this.data.subSommission+this.data.subTeamReward;
    console.log('count-->' + count);
    this.setData({
      drawmoneyCnt: count,
    });
  },
  setDrawmoney: function (e) {
    this.setData({
      // drawmoneyCnt: e.detail.value
    })
  }
})