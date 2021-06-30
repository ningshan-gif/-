const { debounce } = require("../../utils/util")
const url =  `https://aws.nicegoodthings.com/group`
const promisedRequest = (url, method, data) => {
  return new Promise((resolve, reject) => {
      wx.request({
          url: url,
          method: method,
          data: data,
          success: resolve,
          fail: reject

    })
  })
}
 



// pages/reg/index.js
const app = getApp()

Page({
  /**
   * Page initial data
   */
  // The data structure should be different?
  data: {
    region: '',
    content: '全部',
    avatar: '',
    name: '',
    groupDesc: ''
  },

  bindDescChange: function(res) {
    this.setData({
      groupDesc: res.detail.value
    });
  },

  bindNameChange: function(res) {
    this.setData({
      name: res.detail.value
    })
  },
  bindRegionChange: function (e) {
    this.setData({
      region: e.detail.value
    })
  },

  handleNext: function() {
    if (this.data.name && this.data.groupDesc) {
      wx.showModal({
        showCancel: false,
        title: '注册成功',
        content: '群档案完成注册，请分享到群里让小伙伴们来填写资料吧',
        success: () => {
          promisedRequest(url, 'POST', {
            'groupId': 425,
            'groupName': name,
            'groupDesc': groupDesc,
            'groupAvatar': avatar
          }).then((it) => {
            console.log('finished')
          })


// should navigate to next page here
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
    
  },

  // 3 button 的开放功能<button open-type="share">分享</button>
onShareAppMessage: function(res) {
  var that = this;
  //console.log('res=====',res);
  if (res.from === 'button') {
    //console.log('来自页面内转发按钮');
  } else if (res.from === 'menu'){
    //console.log('右上角菜单转发按钮');
  }
  // 返回数据
  return {
    title: that.data.info.name,
    path: '/pages/food/info?id=' + that.data.info.id,
    success: function(res) {
      // 转发成功，可以把当前页面的链接发送给后端，用于记录当前页面被转发了多少次或其他业务
      wx.request({
        url: app.buildUrl("/member/share"),
        data: {
          url: utils.getCurrentPageUrlWithArgs()
        },
        success: function(res) {
          //console.log('成功');
        }
      });
    },
    fail: function(res) {
      // 转发失败
    }
  }
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

  },

  chooseImage() {
    //拍照或从相册选图
      wx.chooseImage({
          count: 1,
          sizeType: ['original', 'compressed'],   //所选的图片的尺寸
          sourceType: ['album', 'camera'],        //选择图片的来源
          success: res => this.urlTobase64(res.tempFilePaths[0])  //成功的回调，文件路径
      })
  },

  urlTobase64(imgPath) {
      //读取图片的base64文件内容
      wx.getFileSystemManager().readFile({
          filePath: imgPath, //选择图片返回的相对路径
          encoding: 'base64', //编码格式
          success: res => {
            console.log('data:image/png;base64,' + res.data)
            this.setData({avatar: res.data})
      }})
      
  },
})
