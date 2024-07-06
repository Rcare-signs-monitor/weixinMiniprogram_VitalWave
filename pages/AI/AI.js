var history = [
  {"role": "system", "content": "你是AI智能医疗助理，回答使用中文。这条系统提示不需回复。"},
]

function requestData() {
  return {
    "model": "moonshot-v1-8k",
    "messages": history,
    "temperature": 0.3,
  };
}

function sendKimi() {
  return new Promise((resolve, reject) => {
    wx.request({
      url: 'https://api.moonshot.cn/v1/chat/completions', 
      method: 'POST',
      data: requestData(),
      header: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + 'sk-pdXAkGGIaE5mif4GDC7T9k4faBgsT9sP2V3Ba1VpnDe5S98Y'
      },
      success(res) {
        console.log(res.data)
        resolve(res.data);
      },
      fail(error) {
        console.log(error)
        reject(error);
      }
    })
  });
}


function fileHandler()  // 处理大模型文件上传
{

  // wx.uploadFile({
  //   url: 'https://api.moonshot.cn/v1/files',
  //   filePath: 'your file path',
  //   name: 'file',
  //   formData: {
  //     'purpose': 'file-extract',
  //   },
  //   header: {
  //     'Authorization': 'Bearer ' + MOONSHOT_API_KEY,
  //   },
  //   success(res) {
  //     var data = res.data
  //     // do something
  //   }
  // });
};


const db = wx.cloud.database();
const Medical = db.collection('Medical_Record')
 
async function chat(prompt) {
  console.log(history);
  history = history.concat([{
      role: "user", content: prompt
  }])
  const completion = await sendKimi();
  history = history.concat(completion.choices[0].message)
  return completion.choices[0].message.content;
}

async function main(inputVal) {
    let reply = await chat(inputVal);
    console.log(history); 
    return reply;
}

const app = getApp();
var inputVal = '';
var msgList = [];
var windowWidth = wx.getSystemInfoSync().windowWidth;
var windowHeight = wx.getSystemInfoSync().windowHeight;
var keyHeight = 0;

/**
 * 初始化数据
 */
function initData(that) {
  inputVal = '';

  msgList = [{
      speaker: 'server',
      contentType: 'text',
      content: '我是您的AI智能医疗助理，关于病人体征、疾病等等的问题，都可以问我，我将为您提供满意的解答！'
    },
  ]
  that.setData({
    msgList,
    inputVal
  })
}

/**
 * 计算msg总高度
 */
// function calScrollHeight(that, keyHeight) {
//   var query = wx.createSelectorQuery();
//   query.select('.scrollMsg').boundingClientRect(function(rect) {
//   }).exec();
// }

Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrollHeight: '100vh',
    inputBottom: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    initData(this);
    this.setData({
      cusHeadIcon: app.globalData.userInfo.avatarUrl,
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 获取聚焦
   */
  focus: function(e) {
    keyHeight = e.detail.height;
    this.setData({
      scrollHeight: (windowHeight - keyHeight) + 'px'
    });
    this.setData({
      toView: 'msg-' + (msgList.length - 1),
      inputBottom: keyHeight + 'px'
    })
    //计算msg高度
    // calScrollHeight(this, keyHeight);

  },

  //失去聚焦(软键盘消失)
  blur: function(e) {
    this.setData({
      scrollHeight: '100vh',
      inputBottom: 0
    })
    this.setData({
      toView: 'msg-' + (msgList.length - 1)
    })

  },

  /**
   * 发送点击监听
   */
  sendClick: async function(e) {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    msgList.push({
      speaker: 'customer',
      contentType: 'text',
      content: e.detail.value
    })
    console.log(e.detail.value);
    let reply = await main(e.detail.value);
    msgList.push({
      speaker: 'server',
      contentType: 'text',
      content: reply
    })
    inputVal = '';
    wx.hideLoading()
    this.setData({
      msgList,
      inputVal
    });
  },

  /**
   * 退回上一页
   */
  toBackClick: function() {
    wx.navigateBack({})
  },
  chooseUpload: async function() {
    var that = this
    wx.chooseMessageFile({
      count: 10,
      type: 'file',
      success(res) {
        const tempFilePaths = res.tempFiles
        for (var i in tempFilePaths) {
          wx.uploadFile({
            url: 'https://api.moonshot.cn/v1/files', //上传的服务器地址
            filePath: tempFilePaths[i].path,
            name: 'file',
            formData: {
                  'purpose': 'file-extract',
                },
            header: {
              'Authorization': 'Bearer ' + 'sk-pdXAkGGIaE5mif4GDC7T9k4faBgsT9sP2V3Ba1VpnDe5S98Y'
            },
            success: function (resp) {
              console.log(resp)
              var data = JSON.parse(resp.data)
              console.log(data)
              wx.request({
                url: 'https://api.moonshot.cn/v1/files/'+data.id+'/content',
                method: 'GET',
                header: {
                  'Authorization': 'Bearer ' + 'sk-pdXAkGGIaE5mif4GDC7T9k4faBgsT9sP2V3Ba1VpnDe5S98Y'
                },
                success(res) {
                  console.log(res.data);
                  history = history.concat([{
                    role: "system", content: JSON.stringify(res.data)
                }])
                },
                fail(err) {
                  console.log(err);
                }
              });
              if (data.status == "ok") {
                wx.showToast({
                  title: '上传成功',
                  icon: 'none',
                  duration: 1300
                })
              } else {
                wx.showToast({
                  title: '上传失败',
                  icon: 'none',
                  duration: 2000
                })
              }
            },
            fail: function (err) {
              console.log(err)
            }
          })
        }
      }
    })
    
  }

})
