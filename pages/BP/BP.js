import * as echarts from '../../ec-canvas/echarts';


const app = getApp();
let data = [];
let data1 = [];
let data2 = [];
let data3 = [];
let option = {
  title: {
    left: 'center',
    text: '实时血压监测'
  },
  legend: {
    top: 'bottom',
    data: ['Intention']
  },
  tooltip: {
    triggerOn: 'none',
    position: function (pt) {
      return [pt[0], 130];
    }
  },
  toolbox: {
    left: 'center',
    itemSize: 25,
    top: 55,
    feature: {
      dataZoom: {
        yAxisIndex: 'none'
      },
      restore: {}
    }
  },
  xAxis: [{
    type: 'time',
    axisPointer: {
      value: '2016-10-7',
      snap: true,
      lineStyle: {
        color: '#7581BD',
        width: 2
      },
      label: {
        show: true,
        formatter: function (params) {
          return echarts.format.formatTime('yyyy-MM-dd', params.value);
        },
        backgroundColor: '#7581BD'
      },
      handle: {
        color: '#7581BD'
      }
    },
    splitLine: {
      show: false
    }
  },
  {
    gridIndex: 1,
    type: 'time',
    axisPointer: {
      value: '2016-10-7',
      snap: true,
      lineStyle: {
        color: '#7581BD',
        width: 2
      },
      label: {
          show: false,
          formatter: function (params) {
            return echarts.format.formatTime('yyyy-MM-dd hh:mm:ss', params.value);
          },
          backgroundColor: '#7581BD'
      },
      handle: {
          color: '#7581BD'
      }
    },
    splitLine: {
      show: false
    },
    show: false,
  }],
  yAxis: [{
    type: 'value',
    axisTick: {
      inside: true
    },
    splitLine: {
      show: false
    },
    axisLabel: {
      inside: true,
      formatter: '{value}\n',
      show: true
    },
    z: 10,
    min:0,
    max:300,
    interval:50
  },
  {
    gridIndex: 1,
    type: 'value',
    axisTick: {
      inside: true
    },
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
    max:300,
    interval:50
  }
],
  grid: [{
    top: 110,
    left: '5%',
    right: '15%',
    height: 400
  },
  {
    top: 110,
    left: '86%',
    right: '0%',
    height: 400
  }],
  dataZoom: [
    {
      type: 'inside',
      throttle: 50
    }
  ],
  series: [
    {
      name: '低压',
      type: 'line',
      smooth: true,
      symbol: 'circle',
      symbolSize: 5,
      sampling: 'average',
      itemStyle: {
        color: '#0770FF'
      },
      stack: 'a',
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
      data: data
    },
    {
      name: '高压',
      type: 'line',
      smooth: true,
      stack: 'a',
      symbol: 'circle',
      symbolSize: 5,
      sampling: 'average',
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
      data: data1
    },
    {
      type: 'bar',
      barMinWidth: 20,
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
                      {offset: 0, color: '#2378f7'},
                      {offset: 0.7, color: '#2378f7'},
                      {offset: 1, color: '#83bff6'}
                  ]
              )
          }
      },
      data: data2,
      xAxisIndex: 1,
      yAxisIndex: 1
   },
    {
      type: 'bar',
      barMinWidth: 20,
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
      data: data3,
      xAxisIndex: 1,
      yAxisIndex: 1
   },
    
   
  ]
};
function InitData(chart) {
  var reversedDataList = [];
  var reversedDataList1 = [];
  wx.request({ 
    url: 'https://lot2024.site:442/signs/' + app.globalData.userInfo.ward, 
    method: 'GET',  
    success: function(res) 
    { 

      function reverseData(res) {
        return new Promise(function(resolve, reject) {
          for (var i = res.data.data.sbp.length - 1; i >= 0; i--) {
            reversedDataList.push([res.data.data.sbp[i].time, Math.round(res.data.data.sbp[i].data)]);
          }
          for (var i = res.data.data.dbp.length - 1; i >= 0; i--) {
            reversedDataList1.push([res.data.data.dbp[i].time, Math.round(res.data.data.dbp[i].data)]);
          }
          resolve([reversedDataList, reversedDataList1]);
        });
      }
      reverseData(res)
        .then(function(reversedDataList) {
          // 在这里执行后续代码
          option.series[0].data = reversedDataList[0];
          option.series[1].data = reversedDataList[1];
          option.series[2].data = reversedDataList[0][reversedDataList[0].length - 1];
          option.series[3].data = reversedDataList[1][reversedDataList[1].length - 1];
          chart.setOption(option);
        })
        .catch(function(error) {
          console.error('An error occurred:', error);
        });      
    } 
  });
}

function initChart(canvas, width, height, dpr) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // 像素比
  });
  canvas.setChart(chart);
  InitData(chart);
  return chart;
}
var mychart;
Page({
  data: {
    ec: {
      // 在页面加载时调用 initChart
      onInit: function (canvas, width, height, dpr) {
        // 初始化图表并将返回的图表对象存储在 myChart 变量中
        mychart = initChart(canvas, width, height, dpr);
      }
    }
  },
  onLoad()
  {
    this.intervalID = setInterval(this.getNewData, 5000);
  },
  getNewData() {
    var reversedDataList = [];
    var reversedDataList1 = [];
    wx.request({ 
      url: 'https://lot2024.site:442/signs/' + app.globalData.userInfo.ward, 
      method: 'GET',  
      success: function(res) 
      { 
  
        function reverseData(res) {
          return new Promise(function(resolve, reject) {
            for (var i = res.data.data.sbp.length - 1; i >= 0; i--) {
              reversedDataList.push([res.data.data.sbp[i].time, Math.round(res.data.data.sbp[i].data)]);
            }
            for (var i = res.data.data.dbp.length - 1; i >= 0; i--) {
              reversedDataList1.push([res.data.data.dbp[i].time, Math.round(res.data.data.dbp[i].data)]);
            }
            resolve([reversedDataList, reversedDataList1]);
          });
        }
        reverseData(res)
          .then(function(reversedDataList) {
            // 在这里执行后续代码
            option.series[0].data = reversedDataList[0];
            option.series[1].data = reversedDataList[1];
            option.series[2].data = reversedDataList[0][reversedDataList[0].length - 1];
            option.series[3].data = reversedDataList[1][reversedDataList[1].length - 1];
            mychart.setOption(option);
            console.log(option)
          })
          .catch(function(error) {
            console.error('An error occurred:', error);
          });      
      } 
    });
  }
});