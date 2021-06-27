import { requestOrigin, mockOrigin } from './config';
import { showToast } from './util';

const request = ({
  url,
  data,
  method = 'GET',
  header = {
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=utf-8'
  },
  useMock = false,
  cb,
}) => {

  return new Promise((resolve, reject) => {
    const originUrl = useMock ? mockOrigin : requestOrigin;
    wx.showLoading();
    wx.request({
      url: `${url}`,
      data: data,
      header: header,
      method: method,
      success: (res) => {
        if (res.statusCode === 200) {
          const {
            data: { code, data, msg },
          } = res;
          if (code === 0) {
            resolve(data);
          } else {
            reject(msg);
          }
        } else if (res.statusCode == 500) {
          showToast({ msg: '网络错误' });
          return;
        } else {
          reject(res);
        }
      },
      fail: (res) => {
        reject(res);
      },
      complete: () => {
        wx.hideLoading();
      },
    });
  });
};

export default request;
