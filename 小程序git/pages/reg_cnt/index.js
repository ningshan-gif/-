// pages/reg_cnt/index.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    companyShow: false,
    companyConfig: [
      {label: '请输入所在公司', name: 'company', val: ''}, 
      {label: '请输入您的工种', name: 'role', val: ''}
    ],
    companyData: {},
    displayCompany: false,
    educationShow: false,
    educationConfig: [
      {label: '请输入您的本科学校', name: 'undergrad', val: ''}, 
      {label: '请输入您的专业', name: 'major', val: ''}
    ],
    educationData: {},
    displayEducation: false,
  },
  onCompleteCompany: function(e) {
    console.log(e.detail.formData)
    if (!e.detail.formData.company || !e.detail.formData.role) {
      wx.showToast({
        title: '请不要留空哦',
        icon: 'error'
      })
      return;
    }
    this.setData({
      companyData: e.detail.formData,
      displayCompany: true
    });
  },
  handleCompany: function() {
    this.setData({companyShow: true})
  },
  onCompleteEducation: function(e) {
    console.log(e.detail.formData)
    if (!e.detail.formData.undergrad || !e.detail.formData.major) {
      wx.showToast({
        title: '请不要留空哦',
        icon: 'error'
      })
      return;
    }
    this.setData({
      educationData: e.detail.formData,
      displayEducation: true
    });
  },
  handleEduction: function() {
    this.setData({educationShow: true})
  },
  handleNext: function() {
    const content = app.globalData.userData.content;
    content['company'] = this.data.companyData;
    content['education'] = this.data.educationData;
    app.globalData.userData.content = content;
    wx.navigateTo({
      url: '../reg_tags/index'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})