// index.js
// 获取应用实例
// import request from '../../utils/request';
// import { showToast } from '../../utils/util';
const app = getApp()
const baseURL='https://aws.nicegoodthings.com/'

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
    const { currentTarget: { dataset: { groupid } } } = evt;
    // this should navigate to a group detail page rather than a group list?
    wx.navigateTo({
      url: `/pages/index/index?groupid=${groupid}`
    })
  }, 

  handleSub() {

  },
  handlePub() {
  },

  onLoad() {
    promisedRequest(`${baseURL}groups`, 'GET', {
        userId: 423
    }).then((groupLists) => {
        const groupRequests = [];
        // init all requests
        for (let i = 0; i < groupLists.data.groups.length; i++) {
            groupRequests.push(promisedRequest(`${baseURL}group`, 'GET', {
                groupId: e.data.data.groups[i]
            }));
        }
        // await all requests respond and then update the profiles
        Promise.all(groupRequests).then((groupsData) => {
          const groupProfiles = [];
          for (let i = 0; i < groupsData.length; i++) {
            groupProfiles.push({
              // this may not be correct need to look inton what the exact response is
              groupName: groupsData[i].data.groupName,
              groupAvatar: groupsData[i].data.avatar,
              groupDesc: groupsData[i].data.groupDesc
            });
          }
          this.setData({profiles: groupProfiles})
        });
    });

  },
  

})
