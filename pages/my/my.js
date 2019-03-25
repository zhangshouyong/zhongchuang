var app = getApp()

Page({

  data: {
    version: app.globalData.version,
    userInfo: {},
    vip: false,
    login: false,
  },

  test: function() {
    //console.log("test-------->")
  },

  onLoad: function (options) {
    let code = options.code;
    if (code) {
      console.log('code->' + code);
    }
    //调用应用实例的方法获取全局数据
    if (!app.isLogin()) {
      app.login().then(loginFlag => {
        this.setData({
          login: loginFlag
        })
        console.log("login->" + this.data.login);
      });
    }
  },
  
  onShow: function() {
    
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
