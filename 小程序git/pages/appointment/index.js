// pages/appointment/index.js
Page({

  /**
   * Page initial data
   */
  data: {
    addr: "",
    from: null,
    to: null,
    startDate: null,
    startTime: null,
    endDate: null,
    endTime: null
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    const { fid, tid } = options;
    this.setData({ from: fid, to: tid })
  },
  bindTimeChange(evt) {
    const { target: { dataset: { type } }, detail: { value } } = evt;
    console.log({ type });
    switch (type) {
      case 'start':
        this.setData({ startTime: value });
        break;
      case 'end':
        this.setData({ endTime: value })
        break;
      default:
        break;
    }
  },
  handleSubmit() {
    const { addr, from, to, startDate, startTime, endDate, endTime } = this.data;
    const id = Math.random().toString(36).substring(7);
    const params = {
      status: 'PENDING',
      id, addr, from, to, range: {
        from: `${startDate} ${startTime}`,
        to: `${endDate} ${endTime}`
      }
    };
    wx.request({
      url: 'https://wx.nicegoodthings.com/wx/notify',
      method: 'POST',
      data: {
        from,
        to,
        addr,
        range: [`${startDate}~${startTime}`, `${endDate}~${endTime}`],
        msg_id: '6mtp2i6Sf8wc0GRrASQs0gfN88Sb-p1ZJmjwHLiQ89I'
      },
      success: (e) => {
        console.log('res')
      }
    })
    wx.request({
      url: `https://wx.nicegoodthings.com/profile/history`,
      method: 'POST',
      data: {
        id: from,
        data: JSON.stringify(params)
      },
      success: (res) => {
        if (res.data.status == 1) {
          wx.showToast({
            title: "成功",
            icon: 'success'
          })
          // wx.navigateTo({
          //   url: '../appointment_list/index',

          // });

        } else {
          wx.showToast({
            title: "oooooops",
            icon: 'error'
          })
        }
        console.log(res);
      }
    })
    console.log({ params });
  },
  handleAddrChange(evt) {
    const { detail: { value } } = evt;
    this.setData({ addr: value })
  },
  bindDateChange(evt) {
    const { target: { dataset: { type } }, detail: { value } } = evt;
    console.log({ type });
    switch (type) {
      case 'start':
        this.setData({ startDate: value });
        break;
      case 'end':
        this.setData({ endDate: value })
        break;
      default:
        break;
    }
  }
})