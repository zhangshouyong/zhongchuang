let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    circular: true,
    previousMargin: 0,
    nextMargin: 0,
    img_urls: [
      "/assets/images/1.jpeg",
      "/assets/images/2.jpeg",
      "/assets/images/3.jpeg",
    ],
    interval: 5000,
    duration: 1000,
    itemlist: [
      {
        "id": 1,
        "pic": "/assets/images/1.jpeg",
        "name": "纱缦缇",
        "price": 3682,
      },
      {
        "id": 2,
        "pic": "/assets/images/2.jpeg",
        "name": "纱缦缇",
        "price": 3682,
      },
      {
        "id": 3,
        "pic": "/assets/images/3.jpeg",
        "name": "纱缦缇",
        "price": 3682,
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