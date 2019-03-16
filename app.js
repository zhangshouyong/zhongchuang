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
    commission: 422,
    totalSale: 1688,
    addrlist: [],
    addrModify: false,
    session: '',
    loginFlag: false,
    cartlist: [], //购物车
  },

  onLaunch() {
    this.readSession();
    this.readAddr();
    this.readCart();
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
  readCart() {
    let list = wx.getStorageSync("cartResult");
    if ('' === list) {
      list = {};
    }
    console.log("readCart->" + list);
    this.globalData.cartlist = JSON.parse(list);
  },

  saveCart() {
    wx.setStorageSync("cartResult", JSON.stringify(this.globalData.cartlist));
  },

  addCart(good) {
    this.globalData.cartlist.push(good);
    console.log("addcrt->"+ JSON.stringify(good));
    this.saveCart();
  },

  delCart(id) {
    let list = this.globalData.cartlist;
    for (let index in list) {
      if (id == list[index].id) {
        this.globalData.cartlist.splice(index);
        return;     

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
    return this.globalData.commission;
  },
  getTotalSale() {
    return this.globalData.totalSale;
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

  login() {
    return new Promise((resolve, reject) => {
      let that = this
     
      wx.login({
        success(res) {
          console.log(that.globalData)
          that.globalData.loginFlag = true;

          resolve(that.globalData.loginFlag);
          let url = 'http://192.168.1.109:8080/api/login/wx?code=' + res.code;
          wx.request({
            url: url,
            success(res) {
              this.setSession(res.data.data.session);  
            },
            fail(res) {
              console.log(res)
            }
          })
        }
      });
    })
  },

  getUserInfoNew(force) {
    return new Promise((resolve, reject) => {
      if (this.globalData.userInfo) {
        typeof cb === 'function' && cb(this.globalData.userInfo)
        resolve(this.globalData.userInfo)
      } else {
   
        if (this.getSession() === '' || force) {
          wx.login({
            success: res => {
              let url = 'http://192.168.1.109:8080/api/login/wx?code=' + res.code;
              wx.request({
                url: url,
                success: res => {
                  this.setSession(res.data.data.session);
                }
              })

            }
          })
        }
      }
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
              let url = 'http://192.168.1.109:8080/api/login/wx?code=' + res.code;
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

})