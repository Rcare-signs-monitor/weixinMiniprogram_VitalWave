var option1 = []
const app = getApp();
Component({
  data: {
    product: {
      options: [],
    },
    sorter: {
      value: 'default',
      options: [
        {
          value: 'default',
          label: '默认排序',
        },
        {
          value: 'price',
          label: '价格从高到低',
        },
      ],
    },
  },
  methods: {
    onChange(e) {
      this.setData({
        'product.value': e.detail.value,
      });
      app.globalData.userInfo = {
        ward: e.detail.value
      }
      console.log(app.globalData.userInfo.ward)
    },
    initcompo(){
      let that = this
      wx.showLoading({
        title: '加载中,请稍候',
        mask: true
      });
      wx.request({
        url: 'https://lot2024.site:442/members', 
        method: 'GET',
        success: function(res) {
          for (let i=0; i<= res.data.data.length-1;i++)
          {
            let opt = {
              value: res.data.data[i].info.id.toString(),
              label: res.data.data[i].info.name,
              image: res.data.data[i].info.image
            }
            option1.push(opt)
          }
          console.log(option1)
          that.setData({
            'product.value': res.data.data[0].info.id.toString(),
            'product.options': option1,
          });
          wx.hideLoading();
        },
        fail: function(res) {
          console.log(res);
          wx.showToast({
            title: '获取数据失败，请稍后重试',
            icon: 'none',
            duration: 2000
          });
        }
      });
    }
  },
});
