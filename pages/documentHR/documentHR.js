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
var RR;
var sbp;
var dbp;
var dates;


let slidePos = {
  start: 0,
  end: 50,
};

//曲线设置
function setOption(chart, xdata, ydata) {
  const option = {
    title: {
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
function setOption1(chart, xdata, ydata) {
  const option1 = {
    title: {
      
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
      name: '呼吸率',
      type: 'line',
      smooth: true,
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: 'rgba(58,77,233,0.8)'
          },
          {
            offset: 1,
            color: 'rgba(58,77,233,0.3)'
          }
        ])
      },
      data: RR, //y轴上的动态数据
    }],
  };
  chart.setOption(option1)
}
function setOption2(chart, xdata, ydata) {
  const option2 = {
    title: {
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
      name: '收缩压',
      type: 'line',
      smooth: true,
      data: sbp, //y轴上的动态数据
    },{
      name: '舒张压',
      type: 'line',
      smooth: true,
      data: dbp, //y轴上的动态数据
    }],
  };
  chart.setOption(option2)
}
Page({
  data: {
    ec: {
      lazyLoad: true
    },
    ec1: {
      lazyLoad: true
    },
    ec2: {
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
        HR = res.data.data.map(record => record.heart).reverse().slice(-30, -1).map(Math.round);
        RR = res.data.data.map(record => record.respire).reverse().slice(-30, -1).map(Math.round);
        sbp = res.data.data.map(record => record.sbp).reverse().slice(-30, -1).map(Math.round);
        dbp = res.data.data.map(record => record.dbp).reverse().slice(-30, -1).map(Math.round);
        console.log(HR);
        console.log(RR);
        console.log(sbp);
        console.log(dbp);
        dates = res.data.data.map(record => record.time.toString()).reverse().slice(-30, -1);
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
    this.init_echart1()
    this.init_echart2()
    //每隔60s刷新一次
    timer = setInterval(() => {
      this.getOption();
      this.myChart.on('dataZoom', function (event) {
        slidePos = event.batch[0];
      });
      this.myChart1.on('dataZoom', function (event) {
        slidePos = event.batch[0];
      });
      this.myChart2.on('dataZoom', function (event) {
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
    this.Component.init((canvas, width, height,dpr) => {
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height,
        devicePixelRatio: dpr
      });
      this.myChart = chart;//这里直接将初始化的图标传递到参数 myChart 中
      return chart;
    })
  },
  init_echart1 () {
    this.Component1 = this.selectComponent('#mychart1');
    this.Component1.init((canvas, width, height, dpr) => {
      const chart1 = echarts.init(canvas, null, {
        width: width,
        height: height,
        devicePixelRatio: dpr
      });
      this.myChart1 = chart1;//这里直接将初始化的图标传递到参数 myChart1 中
      return chart1;
    })
  },
  init_echart2 () {
    this.Component2 = this.selectComponent('#mychart2');
    this.Component2.init((canvas, width, height, dpr) => {
      const chart2 = echarts.init(canvas, null, {
        width: width,
        height: height,
        devicePixelRatio: dpr
      });
      this.myChart2 = chart2;//这里直接将初始化的图标传递到参数 myChart1 中
      return chart2;
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
    setOption1(this.myChart1)
    setOption2(this.myChart2)
  },
});
