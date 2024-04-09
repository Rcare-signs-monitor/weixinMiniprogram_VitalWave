import * as echarts from '../../ec-canvas/echarts';


const app = getApp();
let timer;
let base = +new Date(2023, 9, 3);
let oneDay = 24 * 3600 * 1000;
let valueBase = Math.random() * 300;
let data = [];
let data1 = [];
let option =  {
  title: {
    left: 'center',
    text: '实时呼吸曲线监测'
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
    gridIndex: 0,
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
  }
],
  yAxis: [{
    gridIndex: 0,
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
    min:0,
    max:30,
    interval:5
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
    max:30,
    interval:5
  }
],
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
  dataZoom: [
    {
      type: 'inside',
      throttle: 50
    }
  ],
  series: [
    {
      name: '呼吸率',
      type: 'line',
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
      data: data,
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
                      {offset: 0, color: '#2378f7'},
                      {offset: 0.7, color: '#2378f7'},
                      {offset: 1, color: '#83bff6'}
                  ]
              )
          }
      },
      data: data1,
      xAxisIndex: 1,
      yAxisIndex: 1
   }
  ],
  
};

function initChart(canvas, width, height, dpr) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // 像素比
  });
  canvas.setChart(chart);
  var reversedDataList = [];
  wx.request({ 
    url: 'https://lot2024.site:442/signs/' + app.globalData.userInfo.ward, 
    method: 'GET',  
    success: function(res) 
    { 

      function reverseData(res) {
        return new Promise(function(resolve, reject) {
          for (var i = res.data.data.respire.length - 1; i >= 0; i--) {
            reversedDataList.push([res.data.data.respire[i].time, Math.round(res.data.data.respire[i].data)]);
          }
          resolve(reversedDataList);
        });
      }
      reverseData(res)
        .then(function(reversedDataList) {
          // 在这里执行后续代码
          option.series[0].data = reversedDataList;
          option.series[1].data = reversedDataList[reversedDataList.length - 1]
          console.log(option)
          chart.setOption(option);
        })
        .catch(function(error) {
          console.error('An error occurred:', error);
        });      
    } 
  });
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
  wx.request({ 
    url: 'https://lot2024.site:442/signs/' + app.globalData.userInfo.ward, 
    method: 'GET',  
    success: function(res) 
    { 

      function reverseData(res) {
        return new Promise(function(resolve, reject) {
          for (var i = res.data.data.respire.length - 1; i >= 0; i--) {
            reversedDataList.push([res.data.data.respire[i].time, Math.round(res.data.data.respire[i].data)]);
          }
          resolve(reversedDataList);
        });
      }
      reverseData(res)
        .then(function(reversedDataList) {
          // 在这里执行后续代码
          option.series[0].data = reversedDataList;
          option.series[1].data = reversedDataList[reversedDataList.length - 1]
          console.log(option)
          mychart.setOption(option);
        })
        .catch(function(error) {
          console.error('An error occurred:', error);
        });      
    } 
  });
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
});