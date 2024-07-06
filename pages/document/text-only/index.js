const url1 = "/pages/document/document";
const url2 = "/pages/documentHR/documentHR";
const url3 = "/pages/documentRR/documentRR";
const url4 = "/pages/documentBP/documentBP";

Component({
  data: {
    value: 'document',
    list: [
      { value: 'document', label: '健康信息' },
      { value: 'documentHR', label: '健康信息可视化' }
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
          case 'document':
            wx.redirectTo({
              url: url1,
              fail: () => {
                  wx.navigateTo({
                      url: '/pages/home/navigateFail/navigateFail',
                  });
              },
            });
            break;
          case 'documentHR':
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
