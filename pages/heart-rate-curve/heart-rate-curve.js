// import * as echarts from '../../ec-canvas/echarts';


// const app = getApp();
// let timer;
// let base = +new Date(2023, 9, 3);
// let oneDay = 24 * 3600 * 1000;
// let valueBase = Math.random() * 300;
// let data = [];
// let data1 = [];
// let option =  {
//   title: {
//     left: 'center',
//     text: '实时心跳曲线监测'
//   },
//   legend: {
//     top: 'bottom',
//     data: ['Intention']
//   },
//   tooltip: {
//     triggerOn: 'none',
//     position: function (pt) {
//       return [pt[0], 130];
//     }
//   },
//   toolbox: {
//     left: 'center',
//     itemSize: 25,
//     top: 55,
//     feature: {
//       dataZoom: {
//         yAxisIndex: 'none'
//       },
//       restore: {}
//     }
//   },
//   xAxis: [{
//     gridIndex: 0,
//     type: 'time',
//     axisPointer: {
//       value: '2016-10-7',
//       snap: true,
//       lineStyle: {
//         color: '#7581BD',
//         width: 2
//       },
//       label: {
//         show: true,
//         formatter: function (params) {
//           return echarts.format.formatTime('yyyy-MM-dd hh:mm:ss', params.value);
//         },
//         backgroundColor: '#7581BD'
//       },
//       handle: {
//         color: '#7581BD'
//       }
//     },
//     splitLine: {
//       show: false
//     }
//   },
//   {
//     gridIndex: 1,
//     type: 'time',
//     axisPointer: {
//       value: '2016-10-7',
//       snap: true,
//       lineStyle: {
//         color: '#7581BD',
//         width: 2
//       },
//       label: {
//           show: false,
//           formatter: function (params) {
//             return echarts.format.formatTime('yyyy-MM-dd hh:mm:ss', params.value);
//           },
//           backgroundColor: '#7581BD'
//       },
//       handle: {
//           color: '#7581BD'
//       }
//     },
//     splitLine: {
//       show: false
//     },
//     show: false,
//   }
// ],
//   yAxis: [{
//     gridIndex: 0,
//     type: 'value',
//     axisTick: {
//       inside: true
//     },
//     splitLine: {
//       show: false
//     },
//     axisLabel: {
//       inside: true,
//       formatter: '{value}\n'
//     },
//     z: 10,
//     min:0,
//     max:200,
//     interval:10
//   },
//   {
//     gridIndex: 1,
//     type: 'value',
//     axisTick: {
//       inside: true
//     },
//     splitLine: {
//       show: false
//     },
//     axisLabel: {
//       inside: true,
//       formatter: '{value}\n'
//     },
//     z: 10,
//     show: false,
//     min:0,
//     max:200,
//     interval:10
//   }
// ],
//   grid: [{
//     top: 110,
//     left: '5%',
//     right: '10%',
//     height: 400
//   },
//   {
//     top: 110,
//     left: '91%',
//     right: '0%',
//     height: 400
//   }
// ],
//   dataZoom: [
//     {
//       type: 'inside',
//       throttle: 50
//     }
//   ],
//   series: [
//     {
//       name: '心率',
//       type: 'line',
//       symbol: 'circle',
//       symbolSize: 5,
//       sampling: 'average',
//       itemStyle: {
//         color: '#F2597F'
//       },
//       stack: 'a',
      // areaStyle: {
      //   color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
      //     {
      //       offset: 0,
      //       color: 'rgba(213,72,120,0.8)'
      //     },
      //     {
      //       offset: 1,
      //       color: 'rgba(213,72,120,0.3)'
      //     }
      //   ])
      // },
//       data: data,
//       xAxisIndex: 0,
//       yAxisIndex: 0
//     },
//     {
//       type: 'bar',
//       label: {
//         show: true, // 显示标签
//         position: 'top', // 标签位置
//         formatter: '{c}' // 标签内容格式
//       },
      // itemStyle: {
      //     color: new echarts.graphic.LinearGradient(
      //         0, 0, 0, 1,
      //         [
      //             {offset: 0, color: '#f688a3'},
      //             {offset: 0.5, color: '#F2597F'},
      //             {offset: 1, color: '#F2597F'}
      //         ]
      //     )
      // },
//       emphasis: {
//           itemStyle: {
//               color: new echarts.graphic.LinearGradient(
//                   0, 0, 0, 1,
                  // [
                  //     {offset: 0, color: '#f0416d'},
                  //     {offset: 0.7, color: '#ec1249'},
                  //     {offset: 1, color: '#ec1249'}
                  // ]
//               )
//           }
//       },
//       data: data1,
//       xAxisIndex: 1,
//       yAxisIndex: 1
//    }
//   ],
// };

// function initChart(canvas, width, height, dpr) {
//   const chart = echarts.init(canvas, null, {
//     width: width,
//     height: height,
//     devicePixelRatio: dpr // 像素比
//   });
//   canvas.setChart(chart);
//   var reversedDataList = [];
//   wx.request({ 
//     url: 'https://lot2024.site:442/signs/' + app.globalData.userInfo.ward, 
//     method: 'GET',  
//     success: function(res) 
//     { 

//       function reverseData(res) {
//         return new Promise(function(resolve, reject) {
//           for (var i = res.data.data.heart.length - 1; i >= 0; i--) {
//             reversedDataList.push([res.data.data.heart[i].time, Math.round(res.data.data.heart[i].data)]);
//           }
//           resolve(reversedDataList);
//         });
//       }
//       reverseData(res)
//         .then(function(reversedDataList) {
//           // 在这里执行后续代码
//           option.series[0].data = reversedDataList;
//           option.series[1].data = reversedDataList[reversedDataList.length - 1]
//           console.log(option)
//           chart.setOption(option);
//         })
//         .catch(function(error) {
//           console.error('An error occurred:', error);
//         });      
//     } 
//   });
//   return chart;
// }
// var mychart;
// Page({
//   data: {
//     ec: {
//       // 在页面加载时调用 initChart
//       onInit: function (canvas, width, height, dpr) {
//         // 初始化图表并将返回的图表对象存储在 myChart 变量中
//         mychart = initChart(canvas, width, height, dpr);
//       }
//     }
//   },
//   onLoad()
//   {
//       this.intervalID = setInterval(this.getNewData, 5000);
//   },
//   getNewData() {
//     var reversedDataList = [];
//   wx.request({ 
//     url: 'https://lot2024.site:442/signs/' + app.globalData.userInfo.ward, 
//     method: 'GET',  
//     success: function(res) 
//     { 

//       function reverseData(res) {
//         return new Promise(function(resolve, reject) {
//           for (var i = res.data.data.heart.length - 1; i >= 0; i--) {
//             reversedDataList.push([res.data.data.heart[i].time, Math.round(res.data.data.heart[i].data)]);
//           }
//           resolve(reversedDataList);
//         });
//       }
//       reverseData(res)
//         .then(function(reversedDataList) {
//           // 在这里执行后续代码
//           option.series[0].data = reversedDataList;
//           option.series[1].data = reversedDataList[reversedDataList.length - 1]
//           console.log(option)
//           mychart.setOption(option);
//         })
//         .catch(function(error) {
//           console.error('An error occurred:', error);
//         });      
//     } 
//   });
//   },
//   goResultPage() {
//   var state = Math.floor(Math.random() * 3) - 1;
//   switch(state)
//   {
//     case 1:
//       wx.navigateTo({url: './result-page/result-page'});
//       break;
//     case 0:
//       wx.navigateTo({url: './result-pageWarn/result-page'});
//       break;
//     case -1:
//       wx.navigateTo({url: './result-pageBad/result-page'});
//       break;
//     default:
//       wx.navigateTo({url: './result-page/result-page'});
//   }
// },
// });

import * as echarts from '../../ec-canvas/echarts';

const app = getApp();
let timer;
let base = +new Date(2023, 9, 3);
let oneDay = 24 * 3600 * 1000;
let valueBase = Math.random() * 300;
let HR;
let newHR;
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
      text: '实时心率曲线监测'
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
      max:190,
      interval:10
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
      max:190,
      interval:10
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
        name: '心率',
        type: 'line',
        smooth: true,
        itemStyle: {
          color: '#F2597F'
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgba(213,72,120,0.8)'
            },
            {
              offset: 1,
              color: 'rgba(213,72,120,0.3)'
            }
          ])
        },
        data: HR,
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
                  {offset: 0, color: '#f688a3'},
                  {offset: 0.5, color: '#F2597F'},
                  {offset: 1, color: '#F2597F'}
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
        data: [newHR],
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
        HR = res.data.data.map(record => record.heart).reverse().slice(-30, -1).map(Math.round);
        console.log(HR);
        dates = res.data.data.map(record => record.time.toString()).reverse().slice(-30, -1);
        console.log(dates);
        newHR = Math.round(HR[HR.length - 1]);
        dates1 = dates[dates.length - 1];
        console.log(newHR)
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