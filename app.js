import gulpError from './utils/gulpError';
App({
    onShow() {
        if (gulpError !== 'gulpErrorPlaceHolder') {
            wx.redirectTo({
                url: `/pages/gulp-error/index?gulpError=${gulpError}`,
            });
        }
    },
    onLaunch() {
      // 初始化云开发
      wx.cloud.init({
        env: 'lot-test-0g7oukwsf488a4a2', // 云开发环境ID
        traceUser: true,
      })
    },
    globalData: {
      userInfo: null,
      wardNum: 0,
      ward: 3
    },
});
