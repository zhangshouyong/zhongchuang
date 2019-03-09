// pages/my/my.js
// 个人中心
//获取应用实例
var app = getApp()

Page({

  data: {
    version: app.globalData.version,
    userInfo: {},
    vip: true,
  },

  test: function() {
    console.log("test-------->")
  },

  onLoad: function () {
    //调用应用实例的方法获取全局数据
    app.getUserInfo(this.test).then(userInfo => {
      //更新数据
      this.setData({
        userInfo
      })
      console.log(userInfo)
    })
  },

  /**
   * 去设置
   */
  toSetting: function () {
    wx.navigateTo({
      url: '/pages/setting/setting',
    })
  },

  /**
   * 退出登录
   */
  logout: function () {
    wx.showModal({
      content: '确定要退出？',
      success: (res) => {
        res.confirm && app.logout(() => {
          this.setData({
            userInfo: {}
          })
        })
      }
    })
  },

  /**
   * 全部订单
   */
  toOrder: function () {
    wx.navigateTo({ url: '/pages/order/order', })
  },
  /**
   * 站内信息
   */
  toNews: function () {
    wx.navigateTo({
      url: '/pages/news/news',
    })
  },
  /**
   * 地址管理
   */
  toAdress: function () {
    wx.navigateTo({
      url: '/pages/adress/adress',
    })
  },
  /**
   * 共享商城
   */
  toHome: function () {
    wx.switchTab({
      url: '/pages/home/home',
    })
  },
  /**
   * 分销中心
   */
  toSale: function () {
    wx.navigateTo({
      url: '/pages/sale/sale',
    })
  },
  /**
   * 成为分销商
   */
  toBuyVip: function () {
    wx.navigateTo({
      url: '/pages/buyvip/buyvip',
    })
  },
  /**
   * 我的优惠券
   */
  toCoupon: function () {
    wx.navigateTo({
      url: '/pages/coupon/coupon',
    })
  },
})
