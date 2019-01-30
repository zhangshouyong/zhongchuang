// pages/intheaters/in_theaters.js
import { Douban } from '../../../../utils/apis.js';

let pageNo1 = 0;
let pageNo2 = 0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading: true,
    loadmore1: true,
    loadmore2: true,
    movies: [],
    commingMovies: [],
    currentNav: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getInTheater();
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    pageNo1 = 0;
    pageNo2 = 0;
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 影院热映
   */
  getInTheater: function () {
    const that = this;
    Douban.get(
        Douban.IN_THEATERS,
        {
          start: pageNo1 * 20
        }
      ).then(res => {
        let subjects = res.subjects;
        for (let item of subjects) {
          item.genres = item.genres.join('/')
        }
        if (pageNo1 == 0) {
          that.setData({
            movies: subjects,
            loadmore1: subjects.length >= 20,
            loading1: false
          });
        } else {
          that.setData({
            movies: that.data.movies.concat(subjects),
            loadmore1: subjects.length >= 20,
            loading1: false
          });
        }
      }
    )
  },
  /**
   * Swiper页发生变化
   */
  onSwiperChange: function (e) {
    const { current } = e.detail;
    this.setData({
      currentNav: current
    });
    if (this.data.commingMovies.length <= 0) {
      this.getComming();
    }
  },
  /**
   * 点击改变Swiper
   */
  changeSwiper: function (e) {
    const { nav } = e.currentTarget.dataset;
    const { currentNav } = this.data;
    if (currentNav != nav) {
      this.setData({
        currentNav: nav
      });
    }
  },
  /**
   * 进入详情
   */
  toDetail: function (event) {
    const { id, title } = event.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/pMovie/pages/details/movieDetails?title=${title}&id=${id}`,
    })
  },
  /**
   * 即将上映
   */
  getComming: function () {
    const that = this;
    Douban.get(
        Douban.COMMING,
        { start: pageNo2 * 20 }
      ).then(res => {
        let subjects = res.subjects;
        for (let item of subjects) {
          item.genres = item.genres.join('/')
        }
        if (pageNo2 == 0) {
          that.setData({
            commingMovies: subjects,
            loadmore2: subjects.length >= 20,
            loading2: false
          });
        } else {
          that.setData({
            commingMovies: that.data.commingMovies.concat(subjects),
            loadmore2: subjects.length >= 20,
            loading2: false
          });
        }
      }
    )
  },
  /**
   * Scroll触底事件
   */
  onScrolTolLower: function (e) {
    const { nav } = e.currentTarget.dataset;
    const that = this;
    if (nav == 'comming' && that.data.loadmore2 && !that.data.loading2) {
      that.setData({ loading2: true });
      pageNo2++;
      that.getComming();
    } else if (nav == 'theater' && that.data.loadmore1 && !that.data.loading1) {
      that.setData({ loading1: true });
      pageNo1++;
      that.getInTheater();
    }
  }
})