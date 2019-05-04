var app = getApp()

Page({

  data: {
    version: app.globalData.version,
    userInfo: {},
    vip: true,
    login: false,
    qrcode: "",
  },

  test: function() {
    //console.log("test-------->")
  },

  onLoad: function (options) {
    let scene = "";
    if (options.scene) {
      let str = decodeURIComponent(options.scene);
      let arr = str.split('_');
      scene = arr[1];
    }
    this.setData({
      qrcode: scene,
    })
    console.log('qrcode----->' + this.data.qrcode)
    //app.login()
  },

  onGotUserInfo(e) {
    console.log("nickname=" + e.detail.userInfo.nickName);
    app.globalData.name = e.detail.userInfo.nickName;
    let that = this
    app.login(that.data.qrcode).then(loginFlag => {
      this.setData({
        login: loginFlag
      })
      console.log("login flag->", that.data.login)
      if (that.data.login) {
        let header = app.getHeader();
        let url = app.getHostUrl() + '/api/user';
        wx.request({
          url: url,
          header: header,
          success(res) {
            console.log("user----->" + JSON.stringify(res.data));
            let team_balance = 0; //团队奖励余额
            let team_total = 0; //团队奖励
            let commission_balance = 0; //佣金余额
            let commission_total = 0; //佣金
            let active_balance = 0; //动态分红余额
            let active_total = 0; //动态分红
            let sale_total = 0; //总销售额
            let session_key = 0; //微信session_key
            let qrcode = res.data.data.qrcode;
            app.globalData.qrcode = res.data.data.qrcode;
            console.log("qrcode --->" + app.globalData.qrcode);
          }
        })
      }
    });
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
