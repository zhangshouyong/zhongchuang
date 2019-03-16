let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addrlist: [],
    operate: 0, //0是选择 1 添加 2是修改 3删除
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let list = app.getAddrlist();
    console.log("list->"+JSON.stringify(list))
    this.setData({
      addrlist: list,
    })
    console.log("1------>" + options.operate)

    let operate = options.operate ? parseInt(options.operate) : 2;
    console.log("operate-->" + operate);
    this.setData({
      operate
    });

    console.log("ope--->"+ this.data.operate)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    if (app.isAddrModify()) {
      app.resetAddrModify();
      let list = app.getAddrlist();
      this.setData({
        addrlist: list,
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})