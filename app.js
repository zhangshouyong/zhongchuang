//app.js
import {
  Honye
} from './utils/apis'
import Util from './utils/util'
/**
 * 主要用来提供两版显示
 * 本地版本号大于服务端版本号代表未发布，简版显示应对审核
 * 本地版本号小余等于服务端版本号代表已发布
 */
const version = {
  versionCode: 10,
  versionName: '1.0.6(10)',
}
/*
wx.cloud.init({
  traceUser: true,
  env: 'dv-963c46',
})
*/

App({
  globalData: {
    version,
    userInfo: null,
    setting: {},
    config: null,
    published: false, // 是否为发布版
    team_balance: 0,        //团队奖励余额
    team_total: 0,          //团队奖励
    commission_balance: 0,  //佣金余额
    commission_total: 0,    //佣金
    active_balance: 0,      //动态分红余额
    active_total: 0,        //动态分红
    sale_total: 0,          //总销售额
    session_key: '',        //微信session_key
    addrlist: [],
    addrModify: false,
    session: '',
    loginFlag: false,
    cartlist: [], //购物车
    orderlist: [], //订单列表 状态state=0 未支付 1支付成功 2支付失败 物品列表[{}, {}]
    teamlist: [],
    team_member: 0,
    curOrder: {}, //{"name":"zsy", "addr":"123", phone:"15900706866", "items":[]}
    userid: 0,
    name: '',
    payorderlist: [],
    payorder_count: 0,
    qrcode: '',
  },

  reqPayorder() {
    console.log("reqPayorder-----> this->" + this)
    let header = this.getHeader();
    let url = this.getHostUrl() + '/api/user/promotionOrderList';
    let that = this
    wx.request({
      url: url,
      header: header,
      success(res) {
        console.log("user----->" + JSON.stringify(res.data));
        //{"orders":["orderNo","userid","totalPrice","wxname","date"]}
        let orders = res.data.orders;
        for (let key in  orders) {
          orders[key].date = Util.formatDate(orders[key].date);
        }
        that.globalData.payorderlist = res.data.data.orders;
        that.globalData.payorder_count = res.data.data.orders.length;
      }
    });
  },

  reqTeamlist() {
    let header = this.getHeader();
    let url = this.getHostUrl() + '/api/user/team';
    wx.request({
      url: url,
      header: header,
      success(res) {
        console.log('reqTeamlist res-->' + res );
        /*
        let teams = res.data.team;
        for (let key in teams) {
          teams[key].create_time = Util.formatDate(teams[key].create_time);
        }
        this.globalData.teamlist = res.data.team;
        this.globalData.team_member = this.globalData.teamlist.length;
        */
        //{"ecode":0,"errmsg":"ok","data":{"team":[{"userid":18,"wxname":null,"create_time":null}]}}
      }
    });
  },

  isLogin() {
    if (this.getSession() === '' || !this.globalData.loginFlag) {
      return false;
    }
    return true;
  },

  onLaunch() {
    this.readSession();
    this.readAddr();
    this.readCart();
    this.readOrder();
  },

  getAddrlist() {
    return this.globalData.addrlist;
  },

  getDefaultAddr() {
    let list = this.globalData.addrlist;
    for (let index in list) {
      if (list[index].default) {
        return list[index];
      }
    }
  },

  readOrder() {
    let list = wx.getStorageSync("orderResult");
    if ('' === list) {
      this.globalData.orderlist = [];
    } else {
      this.globalData.orderlist = JSON.parse(list);
    }
    
  },

  saveOrder() {
    wx.setStorageSync("orderResult", JSON.stringify(this.globalData.orderlist));
  },

  addOrder(order) {
    this.globalData.orderlist.push(order);
    console.log("addOrder->" + JSON.stringify(order));
    this.saveOrder();
  },

  modifyOrder(id, state) {
    let list = this.globalData.orderlist;
    for (let index in list) {
      if (id == list[index].id) {
        list[index].state = state;
        this.saveOrder();
        return;
      }
    }
  },
  
  delOrder(id) {
    let list = this.globalData.orderlist;
    for (let index in list) {
      if (id == list[index].id) {
        this.globalData.orderlist.splice(index);
        this.saveOrder();
        return;
      }
    }
  },

  readCart() {
    let list = wx.getStorageSync("cartResult");
    if ('' === list) {
      list = "[]";
    }
    console.log("readCart->" + list);
    this.globalData.cartlist = JSON.parse(list);
  },

  saveCart() {
    wx.setStorageSync("cartResult", JSON.stringify(this.globalData.cartlist));
  },

  addCart(good) {
    let item = this.getCart(good.id) 
    if (item) {
      item.number += good.number;
    } else {
      this.globalData.cartlist.push(good);
    }
    console.log("addcrt->"+ JSON.stringify(good));
    this.saveCart();
  },

  delCart(id) {
    let list = this.globalData.cartlist;
    for (let index in list) {
      if (id == list[index].id) {
        this.globalData.cartlist.splice(index);
        this.saveCart();
        return;     
      }
    }
  },

  getCart(id) {
    let list = this.globalData.cartlist;
    for (let i in list) {
      if (list[i].id == id) {
        return list[i];
      }
    }
  },

  getAddr(id) {
    if (id == 0) {
      return this.getDefaultAddr();
    }

    let list = this.globalData.addrlist;
    for (let index in list) {
      if (id == list[index].id) {
        return list[index];
      }
    }
  },

  readAddr() {
    let addrData = wx.getStorageSync("addrlist");
    if('' === addrData) {
      return []
    }
    console.log("readAddr->" + JSON.stringify(addrData))
    return this.globalData.addrlist = JSON.parse(addrData);
  },

  saveAddr() {
    this.globalData.addrModify = true;
    wx.setStorageSync("addrlist", JSON.stringify(this.globalData.addrlist));
  },

  resetAddrModify() {
    this.globalData.addrModify = false;
  },

  resetAddDefault() {
    let list = this.globalData.addrlist;
    for (let i in list) {
      list[i].default = false;
    }
  },

  isAddrModify() {
    return this.globalData.addrModify;
  },

  getMaxAddrid() {
    let list = this.globalData.addrlist;
    let maxId = 1;
    for (let i in list) {
      if (maxId < list[i].id) {
        maxId = list[i].id;
      }
    }
    return maxId;
  },

  updateAddr(addr) {
    let list = this.globalData.addrlist;
    for (let index in list) {
      if (addr.id == list[index].id) {
        list[index] = addr;
      }
    }
  },

  addAddr(addr) {
    if (addr.id == "0") {
      addr.id = this.getMaxAddrid()+1;
      this.globalData.addrlist.push(addr);
    } else {
      let oldAddr = this.getAddr(addr.id);
      this.updateAddr(addr);
    }
    this.saveAddr();
  },
  delAddr(id) {
    let list = this.globalData.addrlist;
    for (let index in list) {
      if (id == list[index].id) {
        this.globalData.addrlist.splice(index);
      }
    }
    this.saveAddr();
  },
  getCommission() {
    return this.globalData.commission_total;
  },
  getTotalSale() {
    return this.globalData.sale_total;
  },
  getTeamTotal() {
    return this.globalData.team_total;
  },
  getActiveTotal() {
    return this.globalData.active_total;
  },
  getCommissionBalance() {
    return this.globalData.commission_balance;
  },
  getActiveBalance() {
    return this.globalData.active_balance;
  },
  getTeamBalance() {
    return this.globalData.team_balance;
  },
  getIncome() {
    return this.globalData.team_total+this.globalData.commission_total+this.globalData.active_total
  },
  setSession(session) {
    this.globalData.session = session;
    this.saveSession();
  },
  saveSession() {
    wx.setStorageSync("session", this.globalData.session);
  },
  getSession() {
    return this.globalData.session;
  },
  readSession() {
    this.globalData.session = wx.getStorageSync("session");
  },

  login(qrcode) {
    return new Promise((resolve, reject) => {
      console.log("login------qrcode------>", qrcode);
      let that = this
      wx.login({
        success(res) {
          console.log("login res11111 ->" + JSON.stringify(res))
          console.log(that.globalData)
          that.globalData.loginFlag = true;
          resolve(that.globalData.loginFlag);
          console.log("login111-- res.code->" + res.code);
          if (res.code) {

            //name = res_user.userInfo.nickName;
            //console.log("login name---->" + name);
            //qrcode = "123456789"
            let url = that.getHostUrl() + '/api/login/wx?code=' + res.code + "&upline=" + qrcode + "&name=" + "test";
            console.log("logurl ----->" + url)
            wx.request({
              url: url,
              success(res) {
                console.log("app login res->" + JSON.stringify(res));
                if (res.data.data) {
                  that.setSession(res.data.data.session);
                }
              },
              fail(res) {
                console.log(res);
              }
            })
          }
        }
      });
    })
  },
  /**
   * 获取用户信息
   * 支持 callback 和 Promise
   * @param {function} cb (object:userInfo) => void
   */
  getUserInfo(cb) {
    return new Promise((resolve, reject) => {
      if (this.globalData.userInfo) {
        typeof cb === 'function' && cb(this.globalData.userInfo)
        resolve(this.globalData.userInfo)
      } else {
        if (this.getSession() === '') {
          wx.login({
            success: res => {
              let url = this.getHostUrl() + 'api/login/wx?code=' + res.code;
              wx.request({
                url: url,
                success: res => {
                  this.setSession(res.data.data.session);
                }
              })
           
            }
          })
        } 

         wx.getUserInfo({
          success: res => {
            this.globalData.userInfo = res.userInfo
            typeof cb === 'function' && cb(this.globalData.userInfo)
            resolve(this.globalData.userInfo)
          }
        })
 
      }
    })
  },

  /** 从服务器获取默认配置 */
  getDefaultConfig(callback) {
    return new Promise((resolve, reject) => {
      if (this.globalData.config) {
        typeof callback === 'function' && callback(this.globalData.config)
        resolve(this.globalData.config)
      } else {
        Honye.get(Honye.CONFIG)
          .then(res => {
            this.globalData.config = res
            this.globalData.published = version.versionCode <= res.newestVersion
            typeof callback === 'function' && callback(res)
            resolve(res)
          })
      }
    })
  },

  /**
   * 是否已经发布
   * @param {Function} callback 回调返回 Boolean 结果
   */
  hasPublished(callback) {
    if (this.globalData.config) {
      typeof callback == "function" &&
        callback(this.globalData.published)
    } else {
      this.getDefaultConfig((res) => {
        const published = version.versionCode <= res.newestVersion
        typeof callback == "function" &&
          callback(published)
      })
    }
  },

  getToken() {

  },

  requestToken() {

  },

  saveToken() {

  },

  /** 退出登录 */
  logout(callback) {
    this.globalData.userInfo = null
    callback && callback(this.globalData)
  },

  /** 获取本地设置 */
  getSetting(callback) {
    const {
      setting
    } = this.globalData
    if (setting && (!Util.isEmpty(setting))) {
      typeof callback == "function" && callback(setting)
    } else {
      wx.getStorage({
        key: 'setting',
        success: res => {
          this.globalData.setting = res.data
          typeof callback == "function" && callback(res.data)
        }
      })
    }
  },

  getHeader() {
    return {"Authorization" : this.getSession()};
  },
  getHostUrl() {
    //let url = "http://192.168.1.109:8080"
    //let url = "http://129.211.129.62:8080";
    let url = "https://www.zhongchuang288.cn"
    return url;
  }
})