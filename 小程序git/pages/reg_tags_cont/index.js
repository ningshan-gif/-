// pages/reg_tags/index.js
const app = getApp();
const url = `https://aws.nicegoodthings.com/group/member`

Page({

  /**
   * Page initial data
   */
  data: {
    interestDomainTags: [
      {tagName: '互联网/IT',  active: false},{tagName: '交互设计',  active: false},{tagName: 'O2O',  active: false},{tagName: '在线教育',  active: false},{tagName: '移动互联网',  active: false},{tagName: '人力资源',  active: false},{tagName: '计算机软件',  active: false},{tagName: '社区运营',  active: false},{tagName: '媒体',  active: false}
    ],
    interestTopicTags: [
      {tagName: '#创投圈',  active: false},{tagName: '#直播带货',  active: false},{tagName: '#品牌',  active: false},{tagName: '#职场生存指南',  active: false},{tagName: '#科技',  active: false},{tagName: '#出海',  active: false},{tagName: '#海归就业',  active: false},{tagName: '#投资人笔记',  active: false}
    ],
    selectedInterestDomainTags: [],
    selectedInterestTopicTags: []
  },

  handleDomainItem: function(e) {
    if (this.data.selectedInterestDomainTags.length >= 5) {
      wx.showToast({
        title: '至多选择5个tag哦',
        icon: 'error'
      });
    } else {
      const id = e.currentTarget.dataset.id;
      let newTags = this.data.interestDomainTags;
      newTags[id].active = !newTags[id].active
      this.setData({
        interestDomainTags: [...newTags],
        selectedInterestDomainTags: [...this.data.selectedInterestDomainTags, id]
      })
    }
  },

  handleTopicItem: function(e) {
    if (this.data.selectedInterestTopicTags.length >= 5) {
      wx.showToast({
        title: '至多选择5个tag哦',
        icon: 'error'
      });
    } else {
      const id = e.currentTarget.dataset.id;
      let newTags = this.data.interestTopicTags;
      newTags[id].active = !newTags[id].active
      this.setData({
        interestTopicTags: [...newTags],
        selectedInterestTopicTags: [...this.data.selectedInterestTopicTags, id]
      })
    }
  },


  handleNext() {
    if (this.data.selectedInterestDomainTags.length === 0 || 
        this.data.selectedInterestTopicTags.length === 0 ) {
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
      interestDomainTags: this.data.interestDomainTags.filter((it) => it.active).map((it) => it.tagName),
      interestTopicTags: this.data.interestTopicTags.filter((it) => it.active).map((it) => it.tagName)
    };
    
    promisedRequest(url, 'POST', {
      'groupId': 'some number',
      'users': ['123','12',]
    }).then((it) => {
      console.log('finished')
    }),

    wx.request({
      url: 'https://wx.nicegoodthings.com/profile',
      data: {
        username: userData.username,
        location: JSON.stringify(userData.location),
        id: userData.id,
        content: JSON.stringify(contentData)
      },
      method: 'POST',
      success: (res) => {
        if (res.data.status === 1) {
          app.globalData.id = userData.id;
          wx.navigateTo({
            url: '../index/index'
          });
        } else {
          wx.showToast({
            title: '注册失败',
            icon: 'error'
          })
        }
      }
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