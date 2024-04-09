import * as echarts from '../../ec-canvas/echarts';
// import 'echarts-gl' from '../../ec-canvas/echarts';

const app = getApp();
const db = wx.cloud.database();
const Medical = db.collection('Medical_Record')

let timer;//定时刷新，页面退出后关闭定时器
let records;
Medical.where({
  type: 'HR',
})
.get({
  success: function(res) {
    console.log(res.data)
    records = res.data
  }
})

var ROOT_PATH = 'https://echarts.apache.org/examples';
const dataURL = ROOT_PATH + '/data/asset/data/fake-nebula.bin';
var rawData;
wx.request({
        url: dataURL,
        responseType: 'arraybuffer', // 指定响应的数据类型为二进制数组
        success: function (res) {
          // 在这里处理获取到的二进制数据
            var rawData1 = new Float32Array(res.data);
            rawData = handle_rawdata(rawData1).slice(0, 10000)
            
            console.log(rawData)
        },
        fail: function (error) {
          console.error('Request failed:', error);
        }
      });
function handle_rawdata(rawData){
  var result = [];
  for (var i = 0; i < rawData.length; i += 2) 
  {
  // 取两个元素组成一个子数组
  var subArray = [rawData[i], rawData[i + 1]];
  // 将子数组添加到结果数组中
  result.push(subArray);
  }
  return result;
}

function initChart(canvas, width, height, dpr) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // 像素比
  });
  canvas.setChart(chart);

  var option = {
    title: {
      left: 'center',
      text:
        "Rcare 定位系统",
      subtext: '随机点示例'
    },
    tooltip: {},
    toolbox: {
      right: 20,
      feature: {
        dataZoom: {}
      }
    },
    grid: {
      right: 70,
      bottom: 70
    },
    xAxis: [{}],
    yAxis: [{}],
    dataZoom: [
      {
        type: 'inside'
      },
      {
        type: 'slider',
        showDataShadow: false,
        handleIcon:
          'path://M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
        handleSize: '80%'
      },
      {
        type: 'inside',
        orient: 'vertical'
      },
      {
        type: 'slider',
        orient: 'vertical',
        showDataShadow: false,
        handleIcon:
          'path://M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
        handleSize: '80%'
      }
    ],
    animation: false,
    series: [
      {
        type: 'scatter',
        data: rawData,
        symbolSize: 3,
        itemStyle: {
          opacity: 0.4
        },
        
        large: true,
        largeThreshold: 500
      }
    ]
  };
  chart.setOption(option);
  return chart;
}

Page({
  data: {
    ec: {
      onInit: initChart
    }
  }
});