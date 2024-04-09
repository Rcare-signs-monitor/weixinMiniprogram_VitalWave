const url1 = "/pages/breathing-curve/breathing-curve";
const url2 = "/pages/breathing-rate/breathing-rate";
const url3 = "/pages/heart-rate-curve/heart-rate-curve";
const url4 = "/pages/heart-rate/heart-rate";
const url5 = "/pages/BP/BP";
const curr_value = 'label_5';
Component({
  data: {
    value: 'label_5',
    list: [
      { value: 'label_1', label: '呼吸曲线'},
      { value: 'label_2', label: '呼吸率' },
      { value: 'label_3', label: '心跳曲线'},
      { value: 'label_4', label: '心率'},
      { value: 'label_5', label: '血压'},
    ],
  },

  methods: {
    onChange(e) {
      console.log(e.detail.value)
      // 切换到新页面
      if (e.detail.value != curr_value)
      {
        console.log(1)
        switch (e.detail.value) {
          case 'label_1':
            wx.navigateTo({
              url: url1,
              fail: () => {
                  wx.navigateTo({
                      url: '/pages/home/navigateFail/navigateFail',
                  });
              },
            });
            break;
          case 'label_2':
            wx.navigateTo({
              url: url2,
              fail: () => {
                  wx.navigateTo({
                      url: '/pages/home/navigateFail/navigateFail',
                  });
              },
            });
            break;
          case 'label_3':
            wx.navigateTo({
              url: url3,
              fail: () => {
                  wx.navigateTo({
                      url: '/pages/home/navigateFail/navigateFail',
                  });
              },
            });
            break;
          case 'label_4':
            wx.navigateTo({
              url: url4,
              fail: () => {
                  wx.navigateTo({
                      url: '/pages/home/navigateFail/navigateFail',
                  });
              },
            });
            break;
          
          case 'label_5':
            wx.navigateTo({
              url: url5,
              fail: () => {
                  wx.navigateTo({
                      url: '/pages/home/navigateFail/navigateFail',
                  });
              },
            });
            break;
          default:
            wx.navigateTo({
              url: '/pages/home/navigateFail/navigateFail',
            });
      }
      // this.setData({
      //   value: e.detail.value,
      // });
     }
    },
  },
});
