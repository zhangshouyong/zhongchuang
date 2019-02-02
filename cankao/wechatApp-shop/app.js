//app.js
var Bmob=require("utils/bmob.js");
Bmob.initialize("965bd5435f688777335dafcac521255f", "e5d2d945a29693e97a677650946ba68f");

App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var user = new Bmob.User() //实例化用户对象
    user.auth()
  },
  getUserInfo:function(cb){
    var that = this
  },
  globalData:{
    userInfo:null
  }
})