let app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    orderlist: [], //订单列表
  },

  getitembase(id) {
    let item = {};
    if (id == 1) {
      item.name = "纱缦缇";
      item.pic = "/assets/images/1.jpeg";
    } else if (id == 2) {
      item.name = "纱缦缇";
      item.pic = "/assets/images/2.jpeg";
    } else if (id == 3) {
      item.name = "纱缦缇";
      item.pic = "/assets/images/3.jpeg";
    } 
    return item
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

    let url = app.getHostUrl() + "/api/user/orderlist";
    let header = app.getHeader();
    wx.request({
      url: url,
      header: header,
      method: 'GET',
      success(res) {
        console.log("orders res----->" + JSON.stringify(res));
        let orders = res.data.data.orders;
        for(let i=0; i<orders.length; ++i) {
            console.log("orderNo->" + orders[i].orderNo)
            let order = orders[i];
            if (order.state == 0) {
              order.state = "待付款";
            } else if (order.state == 1) {
              order.state = "已付款";
            } else if (order.state == 2) {
              order.state = "待收货";
            } else if (order.state == 3) {
              order.state = "已完成";
            }

            for (let j=0; j<order.items.length; ++j) {
              let item = order.items[j];
              let base = that.getitembase(item.id);
              item.name = base.name;
              item.pic = base.pic;
            }
        }
        that.setData({
          orderlist: orders,
        })
      },
      fail(res) {
        console.log("fail-->" + JSON.stringify(res));
      }
    });
    /*
    console.log("orderlist->" + JSON.stringify(app.globalData.orderlist))
    that.setData({
      currentTab: currentTab,
      orderlist: app.globalData.orderlist,
    });
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
    switch (this.data.currentTab) {
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