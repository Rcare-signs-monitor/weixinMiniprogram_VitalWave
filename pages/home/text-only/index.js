const url1 = "/pages/home/home";
const url2 = "/pages/user/user";
const url3 = "/pages/user-home/user-home";
Component({
  data: {
    value: 'home',
    list: [
      { value: 'home', label: '首页' , icon: 'https://6c6f-lot-test-0g7oukwsf488a4a2-1323948587.tcb.qcloud.la/%E7%BC%96%E7%BB%84%2020.png?sign=ce35c6787930501442b1e5ec4f087b39&t=1713958895'},
      { value: 'user', label: '我的' , icon: 'https://6c6f-lot-test-0g7oukwsf488a4a2-1323948587.tcb.qcloud.la/%E7%BC%96%E7%BB%84%2020%E5%A4%87%E4%BB%BD.png?sign=657a219c5e61f442e6e2ef593f4503ce&t=1713958917'},
    ],
  },
  properties: {
    // 声明 isLogin 属性，用于接收父组件传递过来的值
    isLogin: {
      type: Boolean,
      value: false, // 默认值，可以根据实际情况设置
    },
  },
  methods: {
    onChange(e) {
      // console.log(this.data.value)
      // 切换到新页面
      if (e.detail.value != this.data.value)
      {
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
            if (this.properties.isLogin == true)
            {
              // debug
              // console.log(this.properties.isLogin)
              wx.redirectTo({
                url: url3,
                fail: () => {
                    wx.navigateTo({
                        url: '/pages/home/navigateFail/navigateFail',
                    });
                },
              });
            }
            else
            {
              // debug
              // console.log(this.properties.isLogin)
              wx.redirectTo({
                url: url2,
                fail: () => {
                    wx.navigateTo({
                        url: '/pages/home/navigateFail/navigateFail',
                    });
                },
              });
            }
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
