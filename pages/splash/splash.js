// 启动屏
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    setTimeout(() => {
      wx.switchTab({
        url: '/pages/tabs/discovery/discovery',
      })
    },1500)
  },

})