// 云函数入口文件
const cloud = require('wx-server-sdk')
const config = require('./config.json');
const https = require('https');
var WXBizDataCrypt = require('./WXBizDataCrypt')
cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();

  const url = 'https://api.weixin.qq.com/sns/jscode2session?appid='+config.APPID+'&secret='+config.APPSECRET + '&js_code=' + event.code +'&grant_type=authorization_code';

  // 将 https.get 包装成 Promise
  const fetchData = () => {
    return new Promise((resolve, reject) => {
      https.get(url, (res) => {
        let data = '';

        // 收到数据块时触发
        res.on('data', (chunk) => {
          data += chunk;
        });

        // 请求结束时触发
        res.on('end', () => {
          // 在这里可以处理返回的数据
          const parsedData = JSON.parse(data);
          const sessionKey = parsedData.session_key;
          const pc = new WXBizDataCrypt(config.APPID, sessionKey);
          const finaldata = pc.decryptData(event.encryptedData, event.iv);
          // 将解密后的数据传递给 resolve
          resolve(finaldata);
        });

        // 请求错误时触发
        res.on('error', (error) => {
          reject(error);
        });
      });
    });
  };

  // 等待异步操作完成
  const finaldata = await fetchData();

  return {
    finaldata,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  };
};