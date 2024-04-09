// pages/user-home/user-home.js
import ux from './data/ux';
import base from './data/base';
const app = getApp();
const db = wx.cloud.database();
const Guardian = db.collection('Guardian')
Page({

    /**
     * 页面的初始数据
     */
    data: {
      ux,
      base,
      showDialog: false,
      confirmBtn: { content: '知道了', variant: 'base' },
      inputText: "",
      unbindingText: "",
      showDialogUnbinding: false,
      showDialogChangeWard: false,
      ward: ""
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
      if (options && options.hasOwnProperty('params')) {
        const paramsStr = decodeURIComponent(options.params);
        const params = JSON.parse(paramsStr);
        // 处理传递过来的参数
        // console.log(params.finaldata.avatarUrl);
        this.setData({
          nickName: params.finaldata.nickName,
          avatarUrl: params.finaldata.avatarUrl,
          openid: params.openid,
        });
        // Guardian.where({
        //   _openid: params.openid,
        // })
        //   .get()
        //   .then(res => {
        //     app.globalData.userInfo = {
        //       nickName: params.finaldata.nickName,
        //       avatarUrl: params.finaldata.avatarUrl,
        //       openid: params.openid,
        //       ward: app.globalData.wardNum == null ? res.data[0].ward : res.data[app.globalData.wardNum].ward
        //     };
        //     console.log(res.data)
        //   })
        //   .catch(err => {
        //     // 处理错误情况
        //     console.error("Error fetching Guardian data:", err);
        //     app.globalData.userInfo = {
        //       nickName: params.finaldata.nickName,
        //       avatarUrl: params.finaldata.avatarUrl,
        //       openid: params.openid,
        //       ward: "DefaultWard" // 设置默认的监护对象
        //     };
        //   });
          
          
          // request形式：
          wx.request({ 
            url: 'https://lot2024.site:442/members', 
            method: 'GET', 
            data: { wid: params.openid }, 
            success: function(res) 
            { 
              app.globalData.userInfo = { 
                nickName: params.finaldata.nickName, 
                avatarUrl: params.finaldata.avatarUrl, 
                openid: params.openid, 
                wards: res.data.data.map(item => item.info.id),
                ward: res.data.data[app.globalData.wardNum].info.id},
                console.log(app.globalData.userInfo.ward)
              }, 
              fail: function(err) 
              { 
                console.error("Error fetching Guardian data:", err); 
                app.globalData.userInfo = { nickName: params.finaldata.nickName, avatarUrl: params.finaldata.avatarUrl, openid: params.openid, ward: "DefaultWard" // 设置默认的监护对象 
              }; 
            } 
          });
      }
      else
      {
        const userInfo = app.globalData.userInfo;
        this.setData({
          nickName: userInfo.nickName,
          avatarUrl: userInfo.avatarUrl,
          openid: userInfo.openid,
        });
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
    clickHandle(e) 
    // e是一个网络请求
    {
        let { name, path = '' } = e.detail.item;
        // console.log(e.detail.item)
        if (!path) {
            name = name.replace(/^[A-Z]/, (match) => `${match}`.toLocaleLowerCase());
            name = name.replace(/[A-Z]/g, (match) => {
                return `-${match.toLowerCase()}`;
            });
            path = `/pages/${name}/${name}`;
            // console.log(path)
        }
        wx.navigateTo({
            url: path,
            fail: () => {
                wx.navigateTo({
                    url: '/pages/home/navigateFail/navigateFail',
                });
            },
        });
    },
    Logout()
    {
      app.globalData.userInfo = null;
      wx.redirectTo({
        url: "/pages/user/user",
        fail: () => {
            wx.navigateTo({
                url: '/pages/home/navigateFail/navigateFail',
            });
        },
      });
    },
    click_handle(e)
    {
      let { name, path = '' } = e.detail.item;
      console.log(name)
      if (name == 'Logout')
      {
        this.Logout()
      }
      else if (name == 'ChangeWard')
      {
        this.Change_Ward()
      }
    },
    Change_Ward()
    {
      this.showChangeWard()

    },
    closeDialogCancel(e)
    {
      this.setData({
        showDialog: false
      });
    },
    closeDialogUnbindingCancel(e)
    {
      this.setData({
        showDialogUnbinding: false
      });
    },
    closeDialogChangeWardCancel(e)
    {
      this.setData({
        showDialogChangeWard: false
      });
    },
    showChangeWard()
    {
      this.setData({
        showDialogChangeWard: true
      });
    },
    bind()
    {
      this.setData({
        showDialog: true
      });
    },
    closeDialog(e)
    {
      this.setData({
        showDialog: false
      });
      console.log(this.data.inputText)
      if (this.data.inputText != "")
      {
        Guardian.add({
          // data 字段表示需新增的 JSON 数据
          data: {
            _id: app.globalData.userInfo.openid + this.data.inputText, // 可选自定义 _id，在此处场景下用数据库自动分配的就可以了
            GuardianID: app.globalData.userInfo.openid,
            ward: this.data.inputText,
          },
          success: function(res) {
            console.log(res)
            wx.showToast({
              title: '绑定成功',  // 提示的内容
              icon: 'success',   // 提示图标，可选值有 'success', 'loading'，默认是 'success'
              duration: 2000      // 提示的延迟时间，单位毫秒，默认是 1500
            });
          },
          fail: function(res) {
            console.log(res)
            wx.showToast({
              title: '请勿重复绑定',  // 提示的内容
              icon: 'none',   // 提示图标，可选值有 'success', 'loading'，默认是 'success'
              duration: 2000      // 提示的延迟时间，单位毫秒，默认是 1500
            });
          },
        })
        
      
        // request方法
        // wx.request({
        //   url: 'https://lot2024.site:442/members', 
        //   method: 'POST', 
        //   data: {
        //     openid: app.globalData.userInfo.openid,
        //     name: this.data.inputText.split(";")[0],
        //     address: this.data.inputText.split(";")[1],
        //     gender: this.data.inputText.split(";")[2],
        //     age: this.data.inputText.split(";")[3],
        //   },
        //   success: function(res) {
        //     console.log(res)
        //     wx.showToast({
        //       title: '绑定成功',
        //       icon: 'success',
        //       duration: 2000
        //     });
        //   },
        //   fail: function(res) {
        //     console.log(res)
        //     wx.showToast({
        //       title: '请勿重复绑定',
        //       icon: 'none',
        //       duration: 2000
        //     });
        //   }
        // });
        

      }
    },
    closeDialogChangeWard(e)
    {
      console.log("ward:", this.data.ward) // this.data.ward为输入的名字
      this.setData({
        showDialogChangeWard: false
      });
      Guardian.where({
        ward: this.data.ward
      }).get({
        success: (res => {
          console.log(res.data)
          if (res.data.length != 0)
          {
            app.globalData.wardNum = res.data.seq_num - 1
            wx.showToast({
              title: '切换成功',  // 提示的内容
              icon: 'success',   // 提示图标，可选值有 'success', 'loading'，默认是 'success'
              duration: 2000      // 提示的延迟时间，单位毫秒，默认是 1500
            });
            this.onLoad()
          }
          else
          {
            wx.showToast({
              title: '切换失败，请检查输入检测对象',  // 提示的内容
              icon: 'none',   // 提示图标，可选值有 'success', 'loading'，默认是 'success'
              duration: 2000      // 提示的延迟时间，单位毫秒，默认是 1500
            });
          }
        }),
      })

      // request方法
      // wx.request({
      //   url: 'https://lot2024.site:442/members', 
      //   method: 'GET', 
      //   data: {
      //     name: this.data.ward
      //   },
      //   success: function(res) {
      //     console.log(res.data)
      //     if (res.data.length !== 0) {
      //       app.globalData.wardNum = res.data.id - 1;
      //       wx.showToast({
      //         title: '切换成功',
      //         icon: 'success',
      //         duration: 2000
      //       });
      //       this.onLoad()
      //     } else {
      //       wx.showToast({
      //         title: '切换失败，请检查输入检测对象',
      //         icon: 'none',
      //         duration: 2000
      //       });
      //     }
      //   },
      //   fail: function(res) {
      //     console.log(res);
      //     wx.showToast({
      //       title: '请求失败，请稍后重试',
      //       icon: 'none',
      //       duration: 2000
      //     });
      //   }
      // });
      
    },
    bindKeyInput(e) {
      this.setData({
        inputText: e.detail.value
      })
    },
    bindKeyInputChangeWard(e) {
      this.setData({
        ward: e.detail.value
      })
    },
    bindKeyInputUnbinding(e) {
      this.setData({
        unbindingText: e.detail.value
      })
    },
    unbind()
    {
      this.setData({
        showDialogUnbinding: true
      });
    },
    closeDialogUnbind()
    {
      this.setData({
        showDialogUnbinding: false
      });
      Guardian.doc(app.globalData.userInfo.openid + this.data.unbindingText).remove({
        success: function(res) {
          console.log(res.data)
          wx.showToast({
            title: '解除绑定成功',  // 提示的内容
            icon: 'success',   // 提示图标，可选值有 'success', 'loading'，默认是 'success'
            duration: 2000      // 提示的延迟时间，单位毫秒，默认是 1500
          });
        },
        fail: function(res) {
          console.log(res.data)
        }
      })
      // request方法

    //   wx.request({
    //     url: 'https://lot2024.site:442/members', 
    //     method: 'GET', 
    //     data: {
    //       name: this.data.unbindingText
    //     },
    //     success: function(res) {
    //     if (res.data.length !== 0) {
    //       wx.request({
    //       url: 'https://lot2024.site:442/members/' + res.data.id.toString(), 
    //       method: 'DELETE', // DELETE 请求
    //       success: function(res) {
    //         console.log(res.data)
    //         wx.showToast({
    //           title: '解除绑定成功',
    //           icon: 'success',
    //           duration: 2000
    //         });
    //       },
    //       fail: function(res) {
    //         console.log(res.data);
    //         wx.showToast({
    //           title: '解除绑定失败，请稍后重试',
    //           icon: 'none',
    //           duration: 2000
    //         });
    //       }
    //     });
    //     }
    //     else
    //     {
    //       wx.showToast({
    //         title: '请先绑定',
    //         icon: 'none',
    //         duration: 2000
    //       });
    //     }
    //   },
    // });


      
      
    },
    bind_handle(e)
    {
      let { name, path = '' } = e.detail.item;
      if (name == "InformationBinding")
      {
        this.bind();
      }
      else
      {
        this.unbind();
      }
    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})