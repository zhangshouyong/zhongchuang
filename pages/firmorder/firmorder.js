
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addr: {},
    curOrdder: [],
    totalMoney: 0,
  },

  getTotalMoney: function() {
    let total = 0;
    let list = app.globalData.curOrder;
    console.log("list->" + JSON.stringify(list))
    
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
  
    let curOrder = app.globalData.curOrder;

    let total = this.getTotalMoney();
    let addrInfo = app.getAddr(id);
    if (addrInfo) {
      this.setData({
        addr: {...addrInfo},
        curOrdder: curOrder,
        totalMoney: total,
      });
    }
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
   * 选择地址
   */
  toAdress() {
    wx.navigateTo({
      url: '/pages/adress/adress?operate=0',
    })
  },


  getOrderItems() {
    let items = new Array();
    for (let i in this.data.curOrdder) {
      let data = this.data.curOrdder[i];
      let item = {"id": data.id, "count": data.number};
      items.push(item);
    }

    return items;
  },

  toOrderDetail() {
    let url = app.getHostUrl() + '/api/user/order';
    let items = this.getOrderItems();
    let order = {
      "address": this.data.addr.addr,  "items": items,
    };

    console.log("order--->" + JSON.stringify(order));
    /*
    let orderData = {"address": this.data.addr.addr, "items":[{"id": 1,"count":2}, {"id":2, "count": 3}]};
    let header = app.getHeader();
    let that = this;
    wx.request({
      url: url,
      header: header,
      method: 'POST',
      data: orderData,
      success(res) {
        console.log("res====>" + JSON.stringify(res));
        wx.setStorageSync("paydata", res.data.data);
        url = '/pages/orderdetail/orderdetail?data=' + JSON.stringify(that.data);
        wx.navigateTo({
          url: url,
        })
        
      },
      fail(res) {
        console.log("fail-->" + JSON.stringify(res));
      }
    })
    */
  }
})