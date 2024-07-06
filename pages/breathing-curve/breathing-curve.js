import * as echarts from '../../ec-canvas/echarts';

const app = getApp();
let timer;
let base = +new Date(2023, 9, 3);
let oneDay = 24 * 3600 * 1000;
let valueBase = Math.random() * 300;
let RR;
let newRR;
let dates;
let dates1;
let slidePos = {
  start: 0,
  end: 50,
};
function setOption(chart, xdata, ydata) {
  const option1 = {
    title: {
      left: 'center',
      text: '实时呼吸曲线监测'
    },
    legend: {
      top: 'bottom',
      data: ['Intention']
    },
    tooltip: {
      show: true,
      trigger: 'axis'
    },
    grid: [{
      top: 110,
      left: '5%',
      right: '10%',
      height: 400
    },
    {
      top: 110,
      left: '91%',
      right: '0%',
      height: 400
    }
  ],
    toolbox: {
      left: 'center',
      itemSize: 25,
      top: 55,
      feature: {
        dataZoom: {
          yAxisIndex: 'none',
        },
        restore: {}
      }
    },
    xAxis: [{
      gridIndex: 0,
      type: 'category',
      boundaryGap: false,
      splitLine: {
        show: false
      },
      data: dates
    },
    {
      gridIndex: 1,
      type: 'category',
      boundaryGap: false,
      splitLine: {
        show: false
      },
      show: false,
      data: ['value']
    }
  ],
    yAxis: [{
      gridIndex: 0,
      type: 'value',
      splitLine: {
        show: false
      },
      axisTick: {
        inside: true
      },
      axisLabel: {
        inside: true,
        formatter: '{value}\n'
      },
      z: 10,
      min:0,
      max:60,
      interval:5
    },
    {
      gridIndex: 1,
      type: 'value',
      splitLine: {
        show: false
      },
      axisLabel: {
        inside: true,
        formatter: '{value}\n'
      },
      z: 10,
      show: false,
      min:0,
      max:60,
      interval:5
    }
  ],
  dataZoom:{
    type: 'inside',//有单独的滑动条，用户在滑动条上进行缩放或漫游。inside是直接可以是在内部拖动显示
    show: true,//是否显示 组件。如果设置为 false，不会显示，但是数据过滤的功能还存在。
    start: slidePos.start,//数据窗口范围的起始百分比0-100
    end: slidePos.end,//数据窗口范围的结束百分比0-100
    xAxisIndex: [0],// 此处表示控制第一个xAxis，设置 dataZoom-slider 组件控制的 x轴 可是已数组[0,2]表示控制第一，三个；xAxisIndex: 2 ，表示控制第二个。yAxisIndex属性同理
    // bottom: -10 //距离底部的距离
  },
    series: [
      {
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
        data: RR,
        xAxisIndex: 0,
        yAxisIndex: 0
      },
      {
        type: 'bar',
        label: {
          show: true, // 显示标签
          position: 'top', // 标签位置
          formatter: '{c}' // 标签内容格式
        },
        itemStyle: {
            color: new echarts.graphic.LinearGradient(
                0, 0, 0, 1,
                [
                    {offset: 0, color: '#83bff6'},
                    {offset: 0.5, color: '#188df0'},
                    {offset: 1, color: '#188df0'}
                ]
            )
        },
        emphasis: {
          itemStyle: {
              color: new echarts.graphic.LinearGradient(
                  0, 0, 0, 1,
                  [
                      {offset: 0, color: '#f0416d'},
                      {offset: 0.7, color: '#ec1249'},
                      {offset: 1, color: '#ec1249'}
                  ]
              )
          }
      },
        data: [newRR],
        xAxisIndex: 1,
        yAxisIndex: 1
     }
    ],
  };
  chart.setOption(option1)
}
Page({
  data: {
    ec: {
      // // 在页面加载时调用 initChart
      // onInit: function (canvas, width, height, dpr) {
      //   // 初始化图表并将返回的图表对象存储在 myChart 变量中
      //   mychart = initChart(canvas, width, height, dpr);
      // }
      lazyLoad: true
    }
  },
  onLoad()
  {
    wx.request({
      url: 'https://lot2024.site:442/signs/' + app.globalData.userInfo.ward, 
      method: 'GET',
      data: {
        table: true,
      },
      success: function(res) {
        RR = res.data.data.map(record => record.respire).reverse().slice(-30, -1).map(Math.round);
        console.log(RR);
        dates = res.data.data.map(record => record.time.toString()).reverse().slice(-30, -1);
        console.log(dates);
        newRR = Math.round(RR[RR.length - 1]);
        dates1 = dates[dates.length - 1];
        console.log(newRR)
        console.log(dates1)
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
    this.init_echart1();
    this.intervalID = setInterval(() => {
      this.getOption();
      this.myChart.on('dataZoom', function (event) {
        slidePos = event.batch[0];
      });
    }, 2000)
  },
  init_echart1() {
    this.Component = this.selectComponent('#mychart');
    this.Component.init((canvas, width, height, dpr) => {
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height,
        devicePixelRatio: dpr
      });
      this.myChart = chart;//这里直接将初始化的图标传递到参数 myChart 中
      return chart;
    })
  },
  goResultPage() {
  var state = Math.floor(Math.random() * 3) - 1;
  switch(state)
  {
    case 1:
      wx.navigateTo({url: './result-page/result-page'});
      break;
    case 0:
      wx.navigateTo({url: './result-pageWarn/result-page'});
      break;
    case -1:
      wx.navigateTo({url: './result-pageBad/result-page'});
      break;
    default:
      wx.navigateTo({url: './result-page/result-page'});
  }
},
getOption: function () {

  // if (xAxisArray.length >= 30) {
  //   xAxisArray.shift(); //如果数据超过了需要解析的最大值，则清除前面的数据，以保留最新的数值
  //   yAxisArray.shift();
  // }

  //利用 myChart 直接绘制曲线
  setOption(this.myChart)
},
});