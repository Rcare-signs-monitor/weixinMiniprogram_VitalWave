const url1 = "/pages/home/home";
const url2 = "/pages/user/user";

Component({
  data: {
    value: 'user',
    list: [
      { value: 'home', label: '首页' },
      { value: 'user', label: '我的' },
    ],
  },

  methods: {
    onChange(e) {
      // console.log(this.data.value)
      // 切换到新页面
      if (e.detail.value != this.data.value)
      {
        // console.log(1)
        switch (e.detail.value) {
          case 'home':
            wx.redirectTo({
              url: url1,
              fail: () => {
                  wx.navigateTo({
                      url: '/pages/home/navigateFail/navigateFail',
                  });
              },
            });
            break;
          case 'user':
            wx.redirectTo({
              url: url2,
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
