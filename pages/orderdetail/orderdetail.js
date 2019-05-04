// pages/orderdetail/orderdetail.js
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 0,
    money: 0,
    date: '2019-03-17 10:32',
    number: '201903162312118888', //
    name: '张守勇',
    phone: '15900706860',
    addr: '上海市普陀区古浪路355弄60号302',
    paydata: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let money = options.money;
    let id = options.id;
    let data = JSON.parse(options.data);
    console.log("data->"+ options.data);
    console.log("paydata->" + options.paydata);
    let paydata = wx.getStorageSync("paydata");
    this.setData({
      id: data.id,
      money: data.totalMoney,
      paydata: paydata,
    })
    console.log("pay----->>>" + JSON.stringify(paydata));
   
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
   * 支付
   */
  pay() {
    let curOrder = app.globalData.curOrder;
    console.log("pa--->" + JSON.stringify(curOrder));
    
    let that = this;
    let data = {...that.data.paydata};
    wx.requestPayment({
      ...that.data.paydata,
      success(res) { 
        console.log("ssss-->" + JSON.stringify(res))
        wx.navigateTo({ url: '/pages/order/order', })
      },
      fail(res) { 
        console.log("ffff-->" + JSON.stringify(res))
        wx.redirectTo({ url: '/pages/order/order', })
      }
    })
    
  }
})