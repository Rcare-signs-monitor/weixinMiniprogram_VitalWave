
Page({

  /**
   * 页面的初始数据
   */
  data: {
    HeartRate: 60,
    Status: 'success'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.intervalId = setInterval(() => {
      let HR = this.getHeartRate();
      var status;
      var text;
      if (HR >= 60 && HR <= 100) {
        status = 'success';
        text = "心率处在正常范围内，请您持续关注。"
      } else if (HR > 100 && HR <= 130) {
        status = 'warning';
        text = `呼吸过快：
        可能原因： 发热、焦虑、激动、缺氧、贫血、心衰等。
        危害：心悸和不适感: 心跳过快可能导致心悸感，使人感到不适。
        头晕和眩晕: 心跳过快可能会导致血液循环不足，引起头晕和眩晕。
        胸痛: 心跳过快可能导致心脏负荷增加，引起胸痛或不适。
        心力衰竭: 长期的心动过速可能会导致心脏肌肉疲劳，最终导致心力衰竭。
        心律失常: 心跳过快可能增加心律失常的风险，包括心房颤动等。 `
      } else if (HR > 130 || HR < 30) {
        status = 'error';
        if (HR > 130)
        {
        text = `危重心动过速：
        可能原因： 发热、焦虑、激动、缺氧、贫血、心衰等。
        危害： 生命受到严重威胁，请密切观察、必要时立即联系医生！`
        }
        else if (HR < 30)
        {
        text = `危重心动过缓：
        可能原因： 长时间的深度睡眠、药物中毒、神经系统疾病等。
        危害： 生命受到严重威胁，请密切观察、必要时立即联系医生！`
        }
      } else if (HR >= 30 && HR < 60) {
        status = 'warning';
        text = `心动过缓：
        可能原因： 长时间的深度睡眠、药物中毒、神经系统疾病等。
        危害： 缺氧: 心动过缓可能导致心脏泵血不足，从而导致身体组织缺氧。
        晕厥和眩晕: 由于供血不足，大脑可能会受到影响，导致晕厥和眩晕的发作。
        疲劳和虚弱: 心脏不断努力以维持足够的血液流动，这可能导致身体感到疲劳和虚弱。`
      } else {
        status = 'success';
      }
      this.setData({
        HeartRate: HR,
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
  getHeartRate(){
    var randomNumber = Math.floor(Math.random() * (91) + 10);
    console.log(randomNumber);
    return randomNumber;
  }
})