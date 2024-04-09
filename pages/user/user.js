// pages/user/user.js

Page({

    /**
     * 页面的初始数据
     */
    data: {
      userInfo: {},
      hasUserInfo: false,
      canIUseGetUserProfile: false,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
      if (wx.getUserProfile) {
        this.setData({
          canIUseGetUserProfile: true
        })
      }
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    },
    // getUserProfile(e) {
    //   var encryptedData;
    //   var iv;
    //   var code;
    //   // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
    //   // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    //   wx.getUserProfile({
    //     desc: '用于获取监测绑定信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
    //     withCredentials: true,
    //     success: (res) => {
    //       this.setData({
    //         userInfo: res.userInfo,
    //         encryptedData: res.encryptedData,
    //         iv: res.iv,
    //         hasUserInfo: true
    //       })
    //       encryptedData = res.encryptedData
    //       iv = res.iv
    //     }
    //   })
    //   wx.login({
    //     success (res) {
    //       if (res.code) {
    //         //发起网络请求
    //         code = res.code
    //       } else {
    //         console.log('登录失败！' + res.errMsg)
    //       }
    //     }
    //   })
    //   const jsonData = {
    //     "encryptedData": encryptedData,
    //     "iv": iv,
    //     "code": code
    //   };
    //   console.log(jsonData)
    // },
    getUserProfile(e) {
      return new Promise((resolve, reject) => {
        let encryptedData;
        let iv;
        let code;
    
        // 获取用户信息
        wx.getUserProfile({
          desc: '用于获取监测绑定信息',
          withCredentials: true,
          success: (res) => {
            encryptedData = res.encryptedData;
            iv = res.iv;
            
            // 登录
            wx.login({
              success: (res) => {
                if (res.code) {
                  code = res.code;
                  // 返回包含用户信息的对象
                  resolve({
                    "encryptedData": encryptedData,
                    "iv": iv,
                    "code": code
                  });
                } else {
                  reject('登录失败！' + res.errMsg);
                }
              },
              fail: (err) => {
                reject('登录失败！' + err.errMsg);
              }
            });
          },
          fail: (err) => {
            reject('获取用户信息失败！' + err.errMsg);
          }
        });
      });
    },
    form_data()
    {
      this.getUserProfile().then((jsonData) => {
        console.log(jsonData);
        wx.cloud.callFunction({
          // 云函数名称
          name: 'decodeEncryptedData',
          // 传给云函数的参数
          data: jsonData,
          success: function(res) {
            console.log(res.result) 
            // const lotDB = wx.cloud.database({
            //   env: 'lot-test-0g7oukwsf488a4a2'
            // })
            // const Guardian = lotDB.collection('Guardian')
            const url_usr_home = "/pages/user-home/user-home";
            wx.redirectTo({
              url: url_usr_home + `?params=${encodeURIComponent(JSON.stringify(res.result))}` ,
              fail: () => {
                  wx.navigateTo({
                      url: '/pages/home/navigateFail/navigateFail',
                  });
              },
            });
          },
          fail: console.error
        })
      }).catch((error) => {
        console.error(error);
      });
    },
})