// pages/document/document.js
// 在 JS 文件中
const app = getApp();
const db = wx.cloud.database();
const Medical_Record = db.collection('Medical_Record');
const Guardian = db.collection('Guardian');

Page({
  data: {
    userList: [] // 存放用户数据
  },
  onLoad: function() {
    var that = this;
    // Medical_Record.where({
    //   user: app.globalData.userInfo.ward,
    // })
    // .get({
    //   success: function(res) {
    //     // res.data 是包含以上定义的两条记录的数组
    //     // console.log(res)
    //     // console.log(app.globalData.userInfo.ward)
    //     const formattedData = res.data.map(item => {
    //       return {
    //         id: item._id,
    //         openid: item._openid,
    //         date: item.date.toString(), // 转换为字符串
    //         type: item.type,
    //         user: item.user,
    //         value: item.value
    //         // ... 其他字段
    //       };
    //     });
    //     // 此处作用域发生了变动， 需要另定义一个that=this
    //     that.setData({
    //       userList: formattedData
    //     }, function() {
    //       // console.log(this.data.userList);
    //       // 在这里执行后续操作
    //     });
    //   }
    // })

    // request方法
    wx.request({
      url: 'https://lot2024.site:442/signs/' + app.globalData.userInfo.ward, 
      method: 'GET', 
      data: {
        num: 10,
        table: true,
      },
      success: function(res) {
        // res.data 是包含以上定义的记录的数组
        // console.log(res)
        // console.log(app.globalData.userInfo.ward)
        const formattedData = res.data.data.map(item => {
          return {
            id: app.globalData.userInfo.ward,
            date: item.time.toString(), // 转换为字符串
            heart_rate: parseFloat(item.heart.toFixed(1)),
            respiratory_rate: parseFloat(item.respire.toFixed(1)),
            systolic_pressure: parseFloat(item.sbp.toFixed(1)),
            diastolic_pressure: parseFloat(item.dbp.toFixed(1))
            // ... 其他字段
          };
        
        });
        console.log(formattedData);
        // 在小程序中，需要注意作用域，这里使用that保存当前作用域
        that.setData({
          userList: formattedData
        }, function() {
          // console.log(that.data.userList);
          // 在这里执行后续操作
        });
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
    
  },
  
  onUserClick: function(event) {
    // 处理用户点击事件
    const userId = event.currentTarget.dataset.id;
    wx.showToast({
      title: `Clicked user with ID ${userId}`,
      icon: 'none'
    });
  }
});
