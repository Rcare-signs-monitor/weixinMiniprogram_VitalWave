// pages/doctor-service/doctor-service.js
var app = getApp();
const db = wx.cloud.database();
const Doctors = db.collection('Doctors');
const Guardian = db.collection('Guardian');
Page({
    data: {
        date: "2024-1-14",
        array1: [ "外科", "骨科", "神经科", "儿科", "内科" ],
        array2: [],
        doctor: [],
        check_date: null,
        jiuzhen: [],
        jiuzhen_index: 0,
        money: [],
        moneynum: "",
        radioIndex: "男",
        index: null,
        indexx: null,
        status: 0,
        mess: {
            department: "脑科",
            date: "2017-12-45",
            doc: "王华",
            name: "花花",
            gender: "女",
            tel: "123456789",
            money: "15.00",
            status: "已完成"
        }
    },
    bindGetUserInfo: function(t) {
        var a = this, o = t.detail.userInfo;
        "getUserInfo:fail auth deny" !== t.detail.errMsg && wx.login({
            success: function(t) {
                t.code ? app.util.request({
                    url: "entry/wxapp/GetUid",
                    cachetime: "0",
                    data: {
                        code: t.code
                    },
                    success: function(t) {
                        wx.setStorageSync("sessionKey", t.data.data.userinfo.session_key), t.data.errno || (wx.setStorageSync("openid", t.data.data.openid), 
                        wx.getUserInfo({
                            success: function(a) {
                                var o = a.userInfo;
                                wx.setStorageSync("userInfo", a.userInfo), app.util.request({
                                    url: "entry/wxapp/TyMember",
                                    data: {
                                        u_name: o.nickName,
                                        u_thumb: o.avatarUrl,
                                        openid: t.data.data.openid
                                    },
                                    success: function(e) {}
                                });
                            }
                        }));
                    },
                    fail: function(e) {
                        console.log(e);
                    }
                }) : console.log("获取用户登录态失败！" + t.errMsg);
            }
        }), wx.setStorage({
            key: "userInfo",
            data: t.detail.userInfo
        }), a.setData({
            userInfo: o
        });
    },
    bindDateChange: function(e) {
        this.setData({
            jiuzhen_index: e.detail.value
        });
    },
    check_radio: function(e) {
        for (var t = this.data.doctime, a = e.currentTarget.dataset.index, o = 0; o < t.length; o++) t[o].checked = 0;
        t[a].checked = 1, this.setData({
            doctime: t,
            check_date: t[a]
        });
    },
    bindPickerChange1: function(e) {
      let that = this;
      let department = this.data.array1[e.detail.value];
    
      Doctors.where({
        department: department,
      })
      .get({
        success: function(res) {
          let newArray2 = [];
          let moneyArray = []
          for (let i = 0; i < res.data.length; i++) {
            let push_flag = true;
    
            for (let j = 0; j < that.data.array2.length; j++) {
              if (that.data.array2[j] == res.data[i].name) {
                push_flag = false;
              }
            }
    
            if (push_flag) {
              newArray2.push(res.data[i].name);
              moneyArray.push(res.data[i].money)
            }
          }
          // setData才会触发重新渲染
          that.setData({
            array2: newArray2,
            index: e.detail.value,
            money: moneyArray
          });
        }
      });
    },
    
    
    bindPickerChange2: function(e) {
        let that = this
        let docName = this.data.array2[e.detail.value]
        let money;
        // let moneyArray = this.data.money 
        Doctors.where({
          name: docName,
        })
        .get({
          success: function(res) {
            money = res.data.money
            docTime = res.data.time
            that.setData({
              indexx: e.detail.value,
              moneynum: money,
              doctime: docTime
          });
          }
        });
        // s = this.data.doctorId 
        // i = s[o]
        // i || wx.showToast({
        //     title: "请先选择科室",
        //     image: "./resource/images/error.png"
        // })
        // app.util.request({
        //     url: "entry/wxapp/Doctime",
        //     data: {
        //         pp_id: i
        //     },
        //     success: function(res) {
        //       this.setData({
        //             doctime: res.data.data
        //         });
        //     },
        //     fail: function(res) {
        //         console.log(res);
        //     }
        // }) 
        
    },
    bindPickerChange: function(e) {
        this.setData({
            index: e.detail.value
        });
    },
    radio: function(e) {
        console.log(e);
        this.setData({
            radioIndex: e.detail.value,
            patient_sex: e.detail.value
        });
    },
    formsubmit: function(t) {
        console.log(t.detail.value);
        var a = this.data.check_date, o = this, n = (t.detail.formId, t.detail.target.dataset.type, 
        o.data.onlyId), s = o.data.ksid, i = t.detail.value, d = i.age, r = i.c_name, c = i.gender, l = i.money, u = i.ky_doctor, y = i.name, g = i.tel, f = (i.date, 
        a.date + " " + a.day + " " + a.startTime);
        if ("" == i.name) wx.showToast({
            title: "请填写姓名",
            image: "/hyb_ylmz/resource/images/error.png"
        }); else if ("" == i.age) wx.showToast({
            title: "请填写年龄",
            image: "/hyb_ylmz/resource/images/error.png"
        }); else if ("" == i.tel) wx.showToast({
            title: "请填写联系方式",
            image: "/hyb_ylmz/resource/images/error.png"
        }); else if (/^1[3|4|5|7|8][0-9]\d{4,8}$/.test(i.tel)) if ("" == i.department) wx.showToast({
            title: "请选择科室",
            image: "/hyb_ylmz/resource/images/error.png"
        }); else if ("" == i.doc) wx.showToast({
            title: "请选择医生",
            image: "/hyb_ylmz/resource/images/error.png"
        }); else {
            var h = wx.getStorageSync("openid");
            app.util.request({
                url: "entry/wxapp/Keshiyuyue",
                data: {
                    ky_name: y,
                    ky_openid: h,
                    ky_sex: c,
                    ky_zhenzhuang: n,
                    ky_telphone: g,
                    ky_time_1: f,
                    ky_doctor: u,
                    ky_docmoney: l,
                    k_name: s,
                    ky_age: d
                },
                header: {
                    "Content-Type": "application/json"
                },
                success: function(a) {
                    a.data;
                    if (console.log(a), 1 == a.data.data) {
                        var n = t.detail.formId;
                        console.log(n), app.util.request({
                            url: "entry/wxapp/Saveformids",
                            method: "GET",
                            data: {
                                openid: h,
                                formId: n
                            },
                            success: function(e) {
                                console.log(e);
                            }
                        }), wx.showToast({
                            title: "提交成功",
                            success: function() {
                                wx.getStorageSync("openid");
                                var a = i.tel;
                                app.util.request({
                                    url: "entry/wxapp/SendSms",
                                    data: {
                                        tel: a,
                                        name: y,
                                        c_name: r,
                                        ky_doctor: u
                                    },
                                    success: function(e) {},
                                    fail: function(e) {
                                        console.log(e);
                                    }
                                });
                                var n = t.detail.value, s = o.data.check_date, d = s.date + " " + s.day + " " + s.startTime;
                                o.setData({
                                    mess: n,
                                    status: 1,
                                    datetime: d
                                }), o.getSelect();
                            }
                        });
                    } else wx.showToast({
                        title: "提交失败",
                        image: "/hyb_ylmz/resource/images/error.png"
                    });
                    o.setData({
                        order: a.data
                    });
                },
                fail: function(e) {
                    console.log(e);
                }
            });
        } else wx.showToast({
            title: "电话格式不正确",
            image: "/hyb_ylmz/resource/images/error.png"
        });
    },
    pay: function() {
        var t = this, a = wx.getStorageSync("openid"), o = t.data.money, n = t.data.ky_id, s = t.data.ky_yibao;
        console.log(o), wx.showModal({
            title: "提示",
            content: " 确认提交么？ ",
            success: function(i) {
                i.confirm && app.util.request({
                    url: "entry/wxapp/Pay",
                    data: {
                        openid: a,
                        z_tw_money: o
                    },
                    method: "POST",
                    header: {
                        "content-type": "application/json"
                    },
                    success: function(a) {
                        console.log(a), wx.requestPayment({
                            timeStamp: a.data.timeStamp,
                            nonceStr: a.data.nonceStr,
                            package: a.data.package,
                            signType: a.data.signType,
                            paySign: a.data.paySign,
                            success: function(a) {
                                console.log(a), app.util.request({
                                    url: "entry/wxapp/Savestudect",
                                    data: {
                                        ky_hexiao: 1,
                                        ky_id: n,
                                        ky_yibao: s
                                    },
                                    success: function(a) {
                                        console.log(a);
                                        var o = t.data.ky_id;
                                        app.util.request({
                                            url: "entry/wxapp/Orderinfo",
                                            data: {
                                                ky_id: o
                                            },
                                            success: function(t) {
                                                console.log(t);
                                                var a = t.data.data.ky_yibao, o = t.data.data.ky_telphone, n = t.data.data.ky_name;
                                                app.util.request({
                                                    url: "entry/wxapp/PaysendSms",
                                                    data: {
                                                        ky_yibao: a,
                                                        ky_telphone: o,
                                                        ky_name: n
                                                    },
                                                    success: function(e) {
                                                        console.log(e);
                                                    },
                                                    fail: function(e) {
                                                        console.log(e);
                                                    }
                                                });
                                            },
                                            fail: function(e) {
                                                console.log(e);
                                            }
                                        }), t.setData({
                                            status: 3
                                        });
                                    },
                                    fail: function(e) {
                                        console.log(e);
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    },
    onLoad: function(t) {
        var a = t.id;
        console.log(a);
        var o = this, n = wx.getStorageSync("openid"), s = wx.getStorageSync("userInfo");
        this.setData({
            openid: n,
            status: t.status,
            ky_id: a,
            userInfo: s
        });
        var i = new Date(), d = i.getFullYear() + "-" + (i.getMonth() + 1) + "-" + i.getDate(), r = [];
        r.push(d);
        for (var c = 1; c <= 9; c++) i.setDate(i.getDate() + 1), d = i.getFullYear() + "-" + (i.getMonth() + 1) + "-" + i.getDate(), 
        r.push(d), r.push();
        this.setData({
            jiuzhen: r
        }), app.util.request({
            url: "entry/wxapp/Keifyy",
            data: {
                openid: n
            },
            success: function(e) {
                o.setData({
                    keifyy: e.data.data
                });
            },
            fail: function(e) {
                console.log(e);
            }
        });
        var l = wx.getStorageSync("title");
        wx.setNavigationBarTitle({
            title: l
        });
    },
    onReady: function() {
        this.getKeshi(), this.getBase(), this.getHdoctor(), this.getSelect();
    },
    getBase: function() {
        var t = this;
        app.util.request({
            url: "entry/wxapp/Base",
            success: function(e) {
                t.setData({
                    baseinfo: e.data.data
                });
            },
            fail: function(e) {
                console.log(e);
            }
        });
    },
    getKeshi: function() {
        var t = this;
        app.util.request({
            url: "entry/wxapp/Keshicx",
            success: function(e) {
                t.setData({
                    array1: e.data.data.c_name,
                    ids: e.data.data.c_id
                });
            },
            fail: function(e) {
                console.log(e);
            }
        });
    },
    getHdoctor: function() {
        var t = this;
        app.util.request({
            url: "entry/wxapp/Hdoctor",
            success: function(e) {
                t.setData({
                    hdoctor: e.data.data,
                    array2: e.data.data.k_name,
                    money: e.data.data.k_yuymoney
                });
            },
            fail: function(e) {
                console.log(e);
            }
        });
    },
    getSelect: function() {
        var t = this, a = t.data.ky_id;
        console.log(a), app.util.request({
            url: "entry/wxapp/Selectorderid",
            data: {
                ky_id: a
            },
            success: function(e) {
                console.log(e), t.setData({
                    info: e.data.data,
                    money: e.data.data.ky_docmoney,
                    ky_yibao: e.data.data.ky_yibao,
                    ky_id: a
                });
            },
            fail: function(e) {
                console.log(e);
            }
        });
    },
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    status: function() {
        wx.navigateTo({
            url: "/hyb_ylmz/index_page/regist/regist"
        });
    },
    getPhoneNumber: function(t) {
        var a = this, o = (t.detail.errMsg, t.detail.iv, t.detail.encryptedData, wx.getStorageSync("code")), n = wx.getStorageSync("sessionKey");
        "getPhoneNumber:fail user deny" == t.detail.errMsg ? wx.showModal({
            title: "提示",
            showCancel: !1,
            content: "未授权",
            success: function(e) {}
        }) : wx.showModal({
            title: "提示",
            showCancel: !1,
            content: "同意授权",
            success: function(s) {
              app.util.request({
                    url: "entry/wxapp/Mdpwd",
                    method: "POST",
                    data: {
                        iv: t.detail.iv,
                        code: o,
                        sessionKey: n,
                        encryptedData: t.detail.encryptedData
                    },
                    header: {
                        "content-type": "application/x-www-form-urlencoded"
                    },
                    success: function(e) {
                        if (console.log(e), "1" == e.data.data.gstage) {
                            var t = JSON.parse(e.data.data.rdata);
                            console.log(t), a.setData({
                                phone: t.phoneNumber
                            }), wx.showToast({
                                title: "获取微信绑定手机号码成功!"
                            });
                        }
                    }
                });
            }
        });
    }
});