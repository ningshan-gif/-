// index.js
// 获取应用实例
// import request from '../../utils/request';
// import { showToast } from '../../utils/util';
const app = getApp()
const baseURL='https://aws.nicegoodthings.com/'


Page({
  data: {
    profiles: [{groupName: 'Privoce员工群', avatar: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.taopic.com%2Fuploads%2Fallimg%2F140712%2F235014-140G201253992.jpg&refer=http%3A%2F%2Fimg.taopic.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1627024658&t=10f221bdc4a1daa38e7402e7236313b7", people: "5", note: '团队：Privoce', position: '技术公司', addr: '北京'},  
    
    {groupName: 'MIT校友群', avatar: "https://logowik.com/content/uploads/images/mit9241.jpg", people: "200", note: '本科，研究生，博士生', position: '美国大学', addr: 'Cambridge'}, 

    {groupName: '周六下午飞盘', avatar: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Frisbee_090719.jpg", people: "10", note: '参与者', position: '运动', addr: '深圳大沙河公园'}, 
  
  ]
  },
  // 事件处理函数
  goProfileDetail(evt) {
    console.log('evt', evt)
    const { currentTarget: { dataset: { uid } } } = evt;
    wx.navigateTo({
      url: `/pages/group_list/index?uid=${uid}&avatar=${evt.currentTarget.dataset.avatar}`
    })
  }, 

  handleSub() {

  },
  handlePub() {
  },

  onLoad() {
    wx.request({
      url: `${baseURL}groups`,
      method: 'GET',
      data: {
        userId: 423
      },
      success: (e) => {
        console.log(e);
        let transformed = [];
        for (i = 0; i < e.data.groups.length; i++) {
            wx.request({
              url: `${baseURL}group`,
              method: 'GET',
              data: {
                groupId: e.data.data.groups[i]
              },
              success: (e) => {
                console.log(e);
                let transformed = transformed.concat([{groupName: e.data.data.groups[i].groupName, groupAvatar: e.data.data.groups[i].avatar, groupDesc: e.data.data.groups[i].groupDesc}]);
              },
              fail: (e)=> {
                console.log('failed')
              }
    
        })
      }
      this.setData({profiles: transformed})
    },
      fail: (e)=> {
        console.log('failed')
      }

    })
    },
  

})
