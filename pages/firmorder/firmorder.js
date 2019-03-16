let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 0,
    name: '张守勇',
    addr: '普陀区',
    phone: '15900706860',
    cartlist: [],
    totalMoney: 0,
  },

  getTotalMoney: function() {
    let total = 0;
    let list = app.globalData.cartlist;
    for (let i in list ) {
      total += list[i].price*list[i].number;
    }
    return total;
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = 0;
    if(Object.keys(options).length !=0) {
      id = options.id
    } 

    let total = this.getTotalMoney();
    let addrInfo = app.getAddr(id);
    this.setData({
      id: addrInfo.id,
      name: addrInfo.name,
      addr: addrInfo.addr,
      phone: addrInfo.phone,
      cartlist: app.globalData.cartlist,
      totalMoney: total,
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
  toAdress() {
    wx.navigateTo({
      url: '/pages/adress/adress?operate=0',
    })
  },
  toOrderDetail() {
    let url = '/pages/orderdetail/orderdetail?id=' + this.data.id + "&money=" + this.data.totalMoney;
    wx.navigateTo({
      url: url,
    })
  }
})