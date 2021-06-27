const showToast = ({ msg = '', icon = 'none', duration = 2000 }) => {
  if (msg && typeof msg != 'object') {
    wx.showToast({
      title: msg,
      icon,
      duration,
    });
  }
};

const debounce = (func, delay) => {
  var timeout;
  return function (e) {
    clearTimeout(timeout);
    var context = this,
      args = arguments;
    timeout = setTimeout(function () {
      func.apply(context, args);
    }, delay);
  };
};

module.exports = {
  showToast,
  debounce: debounce
};
