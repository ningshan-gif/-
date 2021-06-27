// pages/reg_tags/index.js
const app = getApp();

Page({

  /**
   * Page initial data
   */
  data: {
    goodDomainTags: [
      {tagName: '互联网/IT',  active: false},{tagName: '交互设计',  active: false},{tagName: 'O2O',  active: false},{tagName: '在线教育',  active: false},{tagName: '移动互联网',  active: false},{tagName: '人力资源',  active: false},{tagName: '计算机软件',  active: false},{tagName: '社区运营',  active: false},{tagName: '媒体',  active: false}
    ],
    goodTopicTags: [
      {tagName: '#创投圈',  active: false},{tagName: '#直播带货',  active: false},{tagName: '#品牌',  active: false},{tagName: '#职场生存指南',  active: false},{tagName: '#科技',  active: false},{tagName: '#出海',  active: false},{tagName: '#海归就业',  active: false},{tagName: '#投资人笔记',  active: false}
    ],
    selectedGoodDomainTags: [],
    selectedGoodTopicTags: []
  },

  handleDomainItem: function(e) {
    if (this.data.selectedGoodDomainTags.length >= 5) {
      wx.showToast({
        title: '至多选择5个tag哦',
        icon: 'error'
      });
    } else {
      const id = e.currentTarget.dataset.id;
      let newTags = this.data.goodDomainTags;
      newTags[id].active = !newTags[id].active
      this.setData({
        goodDomainTags: [...newTags],
        selectedGoodDomainTags: [...this.data.selectedGoodDomainTags, id]
      })
    }
  },

  handleTopicItem: function(e) {
    if (this.data.selectedGoodTopicTags.length >= 5) {
      wx.showToast({
        title: '至多选择5个tag哦',
        icon: 'error'
      });
    } else {
      const id = e.currentTarget.dataset.id;
      let newTags = this.data.goodTopicTags;
      newTags[id].active = !newTags[id].active
      this.setData({
        goodTopicTags: [...newTags],
        selectedGoodTopicTags: [...this.data.selectedGoodTopicTags, id]
      })
    }
  },

  handleNext() {
    if (this.data.selectedGoodDomainTags.length === 0 || 
        this.data.selectedGoodTopicTags.length === 0 ) {
          wx.showToast({
            title: '请至少各选一个tag',
            icon: 'error'
          });
          return;
        }
    const userData = app.globalData.userData;
    const contentData = {
      ... userData.content,
      gender: userData.content.gender,
      email: userData.content.email,
      avatar: userData.content.avatar,
      goodDomainTags: this.data.goodDomainTags.filter((it) => it.active).map((it) => it.tagName),
      goodTopicTags: this.data.goodTopicTags.filter((it) => it.active).map((it) => it.tagName)
    };
    app.globalData.userData.content = contentData;
    wx.navigateTo({
      url: '../reg_tags_cont/index',
    })
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {

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