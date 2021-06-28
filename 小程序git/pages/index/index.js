// index.js
// 获取应用实例
// import request from '../../utils/request';
// import { showToast } from '../../utils/util';
const app = getApp()

Page({
  data: {
    profiles: []
  },


  // 事件处理函数
  goProfileDetail(evt) {
    console.log('evt', evt)
    const { currentTarget: { dataset: { uid } } } = evt;
    wx.navigateTo({
      url: `/pages/profile/index?uid=${uid}&avatar=${evt.currentTarget.dataset.avatar}`
    })
  },

  handleSub() {
    wx.requestSubscribeMessage({
      tmplIds: ['6mtp2i6Sf8wc0GRrASQs0gfN88Sb-p1ZJmjwHLiQ89I']
    });
  },
  handlePub() {
    wx.request({
      url: 'https://wx.nicegoodthings.com/wx/notify',
      data: {
        from: 'ol3Wl4mvorVlzjBDhaDsfpMsCAiU',
        to: 'ol3Wl4mvorVlzjBDhaDsfpMsCAiU',
        range: ['2020-02-01', '2020-02-01'],
        msg_id: '6mtp2i6Sf8wc0GRrASQs0gfN88Sb-p1ZJmjwHLiQ89I'
      },
      method: 'POST',
      success: (e) => {
        console.log(e)
      }
    })
  },

  onLoad: function(option) {
    console.log(option)
    wx.request ({
      url: `https://aws.nicegoodthings.com/group?groupId=${option.groupid}`,
      method: 'GET',
      success: (e) => {
        console.log(e)
        let {members} = e.data.data
        this.setData({profiles: members})
      }
    })

    }
  },

)
