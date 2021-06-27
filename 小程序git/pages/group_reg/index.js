const { debounce } = require("../../utils/util")

// pages/reg/index.js
const app = getApp()

Page({
  /**
   * Page initial data
   */
  // The data structure should be different?
  data: {
    region: [],
    customItem: '全部',
    avatar: '',
    name: '',
    content: ''
  },

  bindEmailChange: function(res) {
    this.setData({
      email: res.detail.value
    });
  },

  handleGenderChange: function(res) {
    this.setData({
      gendersIndex: res.detail.value
    })
  },
  bindRegionChange: function (e) {
    this.setData({
      region: e.detail.value
    })
  },

  handleNext: function() {
    if (this.data.name && this.data.region && this.data.gendersIndex !== 0 && this.data.email) {
      wx.showModal({
        showCancel: false,
        title: '注册成功',
        content: '群档案完成注册，请分享到群里让小伙伴们来填写资料吧',
        success: () => {
                // show navigate to next page here
            }
          });
        }
      
    else {
      wx.showModal({
        title: '提示',
        content: '请填写完内容',
        showCancel: true
      })
    }
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    const info = app.globalData.userInfo;
    this.setData({
      avatar: info.avatarUrl,
      region: [info.country, info.province, info.city],
      gendersIndex: info.gender === 1 ? 1 : 2,
      name: info.nickName
    });
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  }
})
