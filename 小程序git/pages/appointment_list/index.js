// pages/appointment_list/index.js
Page({

  /**
   * Page initial data
   */
  data: {
    appointments: []

  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    const { uid } = options;
    wx.request({
      url: `https://wx.nicegoodthings.com/profile/histories`,
      method: 'GET',
      data: {
        id: uid,
      },
      success: (res) => {
        console.log({ res });
        // if (res.data.status == 1) {
        //   wx.showToast({
        //     title: "成功",
        //     icon: 'success'
        //   })
        // } else {
        //   wx.showToast({
        //     title: "oooooops",
        //     icon: 'error'
        //   })
        // }
        console.log(res);
      }
    })
  }
})