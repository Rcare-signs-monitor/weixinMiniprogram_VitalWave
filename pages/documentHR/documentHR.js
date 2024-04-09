import * as echarts from '../../ec-canvas/echarts';


const app = getApp();
const db = wx.cloud.database();
const Medical = db.collection('Medical_Record')
let cc = 0;//横坐标序数累加
let xAxisArray = new Array();//横坐标
let yAxisArray = new Array();//纵坐标
let timer;//定时刷新，页面退出后关闭定时器
let records;
var HR;
var dates;

// Medical.where({
//   type: 'HR',
// })
// .get({
//   success: function(res) {
//     console.log(res.data)
//     records = res.data
//   }
// })

// request方法
// wx.request({
//   url: 'https://8.130.38.254:8080/signs/' + app.globalData.userInfo.ward, 
//   method: 'GET', 
//   success: function(res) {
//     console.log(res.data);
//     records = res.data.map(record => record.heartRate);;
//   },
//   fail: function(res) {
//     console.log(res);
//     wx.showToast({
//       title: '获取数据失败，请稍后重试',
//       icon: 'none',
//       duration: 2000
//     });
//   }
// });

let slidePos = {
  start: 0,
  end: 50,
};

//曲线设置
function setOption(chart, xdata, ydata) {
  const option = {
    title: {
      text: '健康档案历史心率曲线',
      left: 'center',
      textStyle: {
        color: '#333',
        fontWeight: 'bold',
        fontSize: 20
      },
    },
    grid: {
      containLabel: true
    },
    tooltip: {
      show: true,
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: dates, //x轴上的动态数据
      // show: false
    },
    yAxis: {
      x: 'center',
      type: 'value',
      splitLine: {
        lineStyle: {
          type: 'dashed'
        }
      }
      // show: false
    },
    dataZoom:{
      type: 'inside',//有单独的滑动条，用户在滑动条上进行缩放或漫游。inside是直接可以是在内部拖动显示
      show: true,//是否显示 组件。如果设置为 false，不会显示，但是数据过滤的功能还存在。
      start: slidePos.start,//数据窗口范围的起始百分比0-100
      end: slidePos.end,//数据窗口范围的结束百分比0-100
      xAxisIndex: [0],// 此处表示控制第一个xAxis，设置 dataZoom-slider 组件控制的 x轴 可是已数组[0,2]表示控制第一，三个；xAxisIndex: 2 ，表示控制第二个。yAxisIndex属性同理
      // bottom: -10 //距离底部的距离
    },
    series: [{
      name: '心率',
      type: 'line',
      smooth: true,
      data: HR, //y轴上的动态数据
    }],
  };
  chart.setOption(option)
}

Page({
  data: {
    ec: {
      lazyLoad: true
    },
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    
    wx.request({
      url: 'https://lot2024.site:442/signs/' + app.globalData.userInfo.ward, 
      method: 'GET',
      data: {
        table: true,
      },
      success: function(res) {
        HR = res.data.data.map(record => record.heart).reverse();
        dates = res.data.data.map(record => record.time.toString()).reverse();
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
    //初始化曲线
    this.init_echart()
    //每隔60s刷新一次
    timer = setInterval(() => {
      this.getOption();
      this.myChart.on('dataZoom', function (event) {
        slidePos = event.batch[0];
      });
    }, 2100)
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
    clearInterval(timer)//注销定时器
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

  // 初始化图表，放在 onLoad() 中(主要是为了得到 myChart )
  init_echart () {
    this.Component = this.selectComponent('#mychart');
    this.Component.init((canvas, width, height) => {
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      this.myChart = chart;//这里直接将初始化的图标传递到参数 myChart 中
      return chart;
    })
  },
  // 给图表加上数据
  getOption: function () {

    // if (xAxisArray.length >= 30) {
    //   xAxisArray.shift(); //如果数据超过了需要解析的最大值，则清除前面的数据，以保留最新的数值
    //   yAxisArray.shift();
    // }

    //利用 myChart 直接绘制曲线
    setOption(this.myChart)
  },
});
