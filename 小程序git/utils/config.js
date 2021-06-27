module.exports = {
  requestOrigin: 'https://wx.nicegoodthings.com',
  mockOrigin: 'http://wx.nicegoodthings.com',
  api: {
    // get profile
    profile: `/profile?uuid=`,
    // post profile
    postProfile:`/profile`,
    // get history
    history:`/history`,
    // get userInfo
    getUserInfo:`/user`
    // 问题列表
    // questions: (lid) => `/brain/level/${lid}/questions`,
  },
};
