// pages/chat/index.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    uid: -1
  },
  handleAccept(){
    wx.navigateTo({
      url: '../tmp_page/index',
    })
  }
})