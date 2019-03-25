let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    itemlist: [
      {
        "id": 1,
        "pic": "/assets/images/jiu_1.jpg",
        "name": "长城干红",
        "price": 3000,
      },
      {
        "id": 2,
        "pic": "/assets/images/jiu_2.jpg",
        "name": "长城干红",
        "price": 3000,
      },
      {
        "id": 3,
        "pic": "/assets/images/jiu_1.jpg",
        "name": "长城干红",
        "price": 3000,
      }, {
        "id": 4,
        "pic": "/assets/images/jiu_2.jpg",
        "name": "长城干红",
        "price": 3000,
      }, {
        "id": 5,
        "pic": "/assets/images/jiu_1.jpg",
        "name": "长城干红",
        "price": 3000,
      }, {
        "id": 6,
        "pic": "/assets/images/jiu_2.jpg",
        "name": "长城干红",
        "price": 3000,
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let url = app.getHostUrl() + "/api/item/itemlist"
    wx.request({
      url: url,
      success(res) {
        console.log("res-->" + JSON.stringify(res));
      }
    })
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
  getItem(id) {
    let list = this.data.itemlist;
    for(let i in list) {
      if (id == list[i].id) {
        return list[i];
      }
    }
  },
  toItemDetail(e) {
    let item = this.getItem(e.target.dataset.itemid);
    let url = '/pages/good/good?data=' + JSON.stringify(item);
    wx.navigateTo({
      url: url,
    });
  }
})