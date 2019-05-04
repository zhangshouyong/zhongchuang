var common = require('../../utils/common.js');
var util = require("../../utils/util.js");
var that;
Page({
  data: {
    currentTab: 0,
    payorderlist: [{
      name: 'zsy1',
      commission: 422,
      money: 1688,
      date: '2019-03-09'
    },
      {
        name: 'zsy2',
        commission: 844,
        money: 3376,
        date: '2019-03-09'
      }],
    ordertype: 0,
    noPayment: [],
    shipments: [],
    Receiving: [],
    finish:[],
  },
  onShow() {
    let totalMoney = null;
    let total = null;
    wx.getStorage({
      key: 'orderResult',
      success: res => {
        console.log(res.data);
        let len = res.data.length;
        let fare = this.data.fare;
        let goodMoney = 0;
        for (let i = 0; i < len; i++) {
          goodMoney += res.data[i].number * res.data[i].price;
          if (res.data[i].fare > fare) {
            fare = res.data[i].fare;
          }
        }
        total = goodMoney + fare;
        this.setData({
          fare: fare.toFixed(2),
          totalMoney: total.toFixed(2),
          goodMoney: goodMoney.toFixed(2),
          detail: res.data
        })
      }
    })
  },
  setCoupon(e) {
    let id = e.currentTarget.dataset.id;
    let price = e.currentTarget.dataset.price;

    this.setData({
      price: price,
      showCoupon: false,
      useCoupon: true,
      coupon: {
        id: id,
        price: price
      }
    })

  },
  getCoupon() {
    if (this.data.allOrder.length != 0) {
      this.setData({
        showCoupon: true
      })
    }
  },
  getAddress() {
    wx.chooseAddress({
      success: (res) => {
        this.setData({
          showAddAddr: false,
          showAddr: true,
          name: res.userName,
          addrdetail: res.provinceName + res.cityName + res.countyName + res.detailInfo,
          tel: res.telNumber
        })
      },
    })
  },
  onLoad() {
    that = this;

    let header = app.getHeader();
    let url = app.getHostUrl() + '/api/user/promotionOrderList';
    wx.request({
      url: url,
      header: header,
      success(res) {
        console.log("user----->" + JSON.stringify(res.data));
        //{"orders":["orderNo","userid","totalPrice","wxname","date"]}
      }
    });
  },
  placeOrder: function(event) {
    var that = this;
    if (this.data.couponid) {
      console.log(2222);
    }
    if (this.data.showAddAddr) {
      common.showTip("请填写收货地址", "loading");
      return false;
    }
    // 发起支付
    var orderDetail = this.data.detail;
    var userInfo = {
      name: this.data.name,
      tel: this.data.tel,
      addrdetail: this.data.addrdetail
    };
    var coupon = this.data.price;
    var totalPrice = parseFloat(this.data.totalMoney) - coupon;

    var remarks = event.detail.value.remark;
    console.log('1q23123')
    wx.getStorage({
      key: 'openid',
      success: function(res) {
        var openId = res.data;
        if (!openId) {
          console.log('未获取到openId请刷新重试');
          return false;
        }
      }
    })
  },
  swichNav: function (e) {
    var that = this;
    console.log("swichNav------>" + e.target.dataset.current)
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
});