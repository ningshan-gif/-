const { debounce } = require("../../utils/util")

// pages/reg/index.js
const app = getApp()

Page({
  /**
   * Page initial data
   */
  data: {
    genders: ['请选择您的性别', '男', '女'],
    gendersIndex: 0,
    region: [],
    customItem: '全部',
    avatar: '',
    name: '',
    email: ''
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
        title: '验证邮箱',
        content: '验证邮件已经发送到您的工作邮箱，请在24小时内完成验证。',
        success: () => {
          wx.login({
            timeout: 1000,
            success: (res) => {
              wx.request({
                url: 'https://wx.nicegoodthings.com/wx/login',
                data: {
                  'jscode': res.code
                },
                zsuccess: (resp) => {
                  app.globalData.userData = {
                    username: this.data.name,
                    location: this.data.region,
                    id: resp.data.openid,
                    content: {
                      gender: this.data.gendersIndex,
                      email: this.data.email,
                      avatar: this.data.avatar
                    }
                  }
                  wx.navigateTo({
                    url: '../reg_cnt/index'
                    
                  });
                }
              })
            }
          });
        }
      })
    } else {
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