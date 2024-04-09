// pages/breathing-rate/breathing-rate.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
      BreathRate: 30,
      Status: 'success'
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
      this.intervalId = setInterval(() => {
        let BR = this.getBreathRate();
        var status;
        var text;
        if (BR >= 12 && BR <= 20) {
          status = 'success';
          text = "呼吸率处在正常范围内，请您持续关注。"
        } else if (BR > 20 && BR <= 50) {
          status = 'warning';
          text = `呼吸过快：
          可能原因： 发热、焦虑、激动、缺氧、贫血、心衰等。
          危害： 可能导致呼吸肌疲劳、呼吸碱中毒、心脏负担增加，对身体产生额外的压力。`
        } else if (BR > 50 || BR < 5) {
          status = 'error';
          if (BR > 50)
          {
          text = `危重呼吸过快：
          可能原因： 发热、焦虑、激动、缺氧、贫血、心衰等。
          危害： 生命受到严重威胁，请立即联系医生！`
          }
          else if (BR < 5)
          {
          text = `危重呼吸过慢：
          可能原因： 长时间的深度睡眠、药物中毒、神经系统疾病等。
          危害： 生命受到严重威胁，请立即联系医生！`
          }
        } else if (BR >= 5 && BR < 12) {
          status = 'warning';
          text = `呼吸过慢：
          可能原因： 长时间的深度睡眠、药物中毒、神经系统疾病等。
          危害： 可能导致低氧血症，对心脏和大脑供氧不足，影响生理功能。`
        } else {
          status = 'success';
        }
        this.setData({
          BreathRate: BR,
          Status: status,
          Text: text
        });
      }, 3000);
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
      clearInterval(this.intervalId);
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

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    },
    getBreathRate(){
      var randomNumber = Math.floor(Math.random() * (91) + 10);
      console.log(randomNumber);
      return randomNumber;
    }
})