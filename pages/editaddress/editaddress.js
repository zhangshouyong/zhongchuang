let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    operate: 1, //0是选择 1 添加 2是修改 3删除
    id: 0,
    name: '',
    addr: '',
    phone: '',
    default: false,
    btnName: '添加',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let operate = parseInt(options.operate);
    let title = "添加地址";
    let def = true;
    console.log(options.default)
    if (options.default === 'false') {
      def = false;
    }
    console.log(options)
    if (operate == 2) {
      this.setData({
        operate,
        id: parseInt(options.id),
        name: options.name,
        addr: options.addr,
        phone: options.phone,
        default: def,
        btnName: '修改'
      })
      title = "修改地址";
    }

    wx.setNavigationBarTitle({
      title: title
    })
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

  },
  addAddr() {
    let data = { ...this.data
    };

    let addrobj = {
      id: data.id,
      name: data.name,
      addr: data.addr,
      phone: data.phone,
      default: data.default
    };
    app.addAddr(addrobj);
    let str = '添加成功';
    if (this.data.operate == 2) {
      str = '修改成功';
    }
    wx.showToast({
      title: str,
      icon: 'success',
      duration: 3000,
    })
  },
  nameInput(e) {
    this.setData({
      name: e.detail.value,
    });
  },
  addrInput(e) {
    this.setData({
      addr: e.detail.value,
    });
  },
  phoneInput(e) {
    this.setData({
      phone: e.detail.value,
    });
  },
  setDefault(e) {
    app.resetAddDefault();
    this.setData({
      default: e.detail.value,
    })
  },
  delAddr() {
    app.delAddr(this.data.id);
    wx.showToast({
      title: '删除成功',
      icon: 'success',
      duration: 1500,
      success: function() {
        setTimeout(function () {
          wx.navigateBack();
        }, 2000) //延迟时间
      }
    })
  }
})