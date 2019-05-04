// pages/team/team.js
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    commission_total: 0,
    sale_total: 0,
    teams: [{
      wxname: 'zsy1',
      level: 1,
      date: '2019-03-09'
    },
    {
      wxname: 'zsy2',
      level: 0,
      date: '2019-03-09'
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      commission_total: app.getCommission(),
      sale_total: app.getTotalSale(),
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

  }
})