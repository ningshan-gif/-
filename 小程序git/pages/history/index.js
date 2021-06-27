// pages/history/index.js
Page({

  /**
   * Page initial data
   */
  data: {
    history: null
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    const { uuid, hid } = options;
    this.setData({ uuid })
    wx.request({
      url: `https://wx.nicegoodthings.com/profile/history?id=${uuid}`,
      method: 'GET',
      success: (res) => {
        const { history } = res.data;
        let curr = history.find(h => h.id == hid);
        if (curr) {
          curr = curr;
          this.setData({ history: curr })
        }
        console.log("history detail", history, curr, hid);
      },
    })
  },
  handleDecline() {
    console.log('handle decline');
    wx.request({
      url: `https://wx.nicegoodthings.com/profile/history`,
      method: 'PUT',
      data: {
        history_id: this.data.history.id,
        id: this.data.uuid,
        data:{
          status: 'DECLINE'
        }
      },
      success: (res) => {
        console.log("history detail", res);
        wx.showToast({
          title: '成功',
        })
      },
    })
  },
  handleAccept() {
    console.log('handle accept');
    wx.request({
      url: `https://wx.nicegoodthings.com/profile/history`,
      method: 'PUT',
      data: {
        history_id: this.data.history.id,
        id: this.data.uuid,
        data:{
          status: 'ACCEPT'
        }
      },
      success: (res) => {
        console.log("history detail", res);
        wx.showToast({
          title: '成功',
        })
      },
    })
  }
})