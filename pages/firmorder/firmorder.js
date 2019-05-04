
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addr: {},
    curOrdder: {},
    totalMoney: 0,
    type: 2, //1为普通订单  2为推广订单
  },

  getTotalMoney: function() {
    let total = 0;
    let list = app.globalData.curOrder.items;
    console.log("items->>>>>>" + JSON.stringify(list))
    for (let i in list ) {
      total += list[i].price*list[i].number;
    }
    return total;
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let type = options.type;
    if (type == 1) {
      this.setData({
        type: type,
      })
    };

    let addrid = 0;
    let curOrder = app.globalData.curOrder;
    let total = this.getTotalMoney();
    if (curOrder) {
      this.setData({
        curOrdder: curOrder,
        totalMoney: total,
      });
    }
    
    let addrInfo = app.getAddr(addrid);
    console.log("addrInfo----->" + addrInfo + "addrid->"+addrid)
    if (addrInfo) {
      this.setData({
        addr: addrInfo?{...addrInfo}: {},
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
    let api = "api/user/promotionOrder"; //推广
    if (this.data.type == 2) {
      api = "/api/user/order";           //普通
    }

    let url = app.getHostUrl() + api;
    let items = this.getOrderItems();
    
    let order = {
      "name": this.data.addr.name, "phone": this.data.addr.phone, "address": this.data.addr.addr, "state": 0,  "items": items,
    };
  
    let orderData = {"address": this.data.addr.addr, "items":[{"id": 1,"count":1}]};
    let header = app.getHeader();
    let that = this;
    wx.request({
      url: url,
      header: header,
      method: 'POST',
      data: orderData,
      success(res) {
        wx.setStorageSync("paydata", res.data.data);
        url = '/pages/orderdetail/orderdetail?data=' + JSON.stringify(that.data);
        wx.navigateTo({
          url: url,
        })
        
      },
      fail(res) {
        console.log("fail-->" + JSON.stringify(res));
      }
    });
  }
})