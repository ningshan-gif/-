// index.js
// 获取应用实例
// import request from '../../utils/request';
// import { showToast } from '../../utils/util';
const app = getApp()

Page({
  data: {
    userInfo: {},
  },
  // 事件处理函数
  handleWechatLogin() {
    wx.showLoading({
      title: '正在登陆',
      mask: true,
    })
    wx.getUserProfile({
      lang: 'zh_CN',
      desc: '数据仅用于当前小程序使用',
      success: (res) => {
        console.log(app.globalData)
        app.globalData.userInfo = JSON.parse(res.rawData);
        wx.hideLoading({
          success: (res) => {
            wx.navigateTo({
              url: '../reg/index',
            })
          },
        })
      },
      fail: (e) => {
        wx.hideLoading();
      }
    });
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
