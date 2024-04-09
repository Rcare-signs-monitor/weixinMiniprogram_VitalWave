import list from './data/base';
import list_document from './data/display';
import list_locate from './data/nav';
import list_doctor from './data/ux';

const app = getApp();
function isUpperCase(str) {
  return str === str.toUpperCase();
}

var scroll_val;
var curridx;
var itemw;

Page({
    data: {
        last_sec_scroll_val: 0,
        list,
        list_document,
        list_locate,
        list_doctor,
        proList: [
          {
            unique: 1,
            id: 1,
            proTitle: "Product A",
            proDec: "Description for Product A",
            proPrice: 50.00,
            proUrl: "https://6c6f-lot-test-0g7oukwsf488a4a2-1323948587.tcb.qcloud.la/1.jpg?sign=28854c64f2d70cc36a144236bb9b157f&t=1709004041",
            selected: false,
            index: 0
          },
          {
            unique: 2,
            id: 2,
            proTitle: "Product B",
            proDec: "Description for Product B",
            proPrice: 65.00,
            proUrl: "https://6c6f-lot-test-0g7oukwsf488a4a2-1323948587.tcb.qcloud.la/2.jpg?sign=9b71e048f949e8433e1ae04c96a4305a&t=1709004055",
            selected: true,
            index: 1
          },
          {
            unique: 3,
            id: 3,
            proTitle: "Product C",
            proDec: "Description for Product C",
            proPrice: 80.00,
            proUrl: "https://6c6f-lot-test-0g7oukwsf488a4a2-1323948587.tcb.qcloud.la/3.jpg?sign=75dc73b0d4821381aca848b0b2cddd8f&t=1709004065",
            selected: false,
            index: 2
          },
          {
            unique: 4,
            id: 4,
            proTitle: "Product D",
            proDec: "Description for Product D",
            proPrice: 80.00,
            proUrl: "https://6c6f-lot-test-0g7oukwsf488a4a2-1323948587.tcb.qcloud.la/4.jpg?sign=78cba5dd6ef7c573680775a790fed387&t=1709004102",
            selected: false,
            index: 3
          }
        ],
    },
    onLoad(options) {
        // setInterval(() => {
        //   if(this.data.last_sec_scroll_val != curridx * itemw)
        //   {
        //     this.setData({
        //       last_sec_scroll_val: curridx * itemw
        //     });
        //     //console.log(this.data.last_sec_scroll_val)
        //   }
        //   else
        //   {

        //   }
        //   this.setData({
        //     last_sec_scroll_val: scroll_val
        //   });
        // }, 1000);
        const { path, q } = options;
        // console.log(path);
        if (q) {
            const str = this.getQueryByUrl(decodeURIComponent(q));
            console.log(str, str.page);
            wx.navigateTo({
                url: `/pages/${str.page}/${str.page}`,
            });
        }
    
        if (app.globalData.userInfo != null)
        {
          console.log(app.globalData.userInfo)
          this.setData({
            is_login: true,
          });
        }
    },
    clickHandle(e) 
    // e是一个网络请求
    {
      if(app.globalData.userInfo == null)
      {
        wx.showToast({
          title: '请先登录',  // 提示的内容
          icon: 'none',   // 提示图标，可选值有 'success', 'loading'，默认是 'success'
          duration: 2000      // 提示的延迟时间，单位毫秒，默认是 1500
        });
      }
      else
      {
        let { name, path = '' } = e.detail.item;
        // console.log(e.detail.item)
        if (!path) {
          if(!isUpperCase(name))
          {
            name = name.replace(/^[A-Z]/, (match) => `${match}`.toLocaleLowerCase());
            name = name.replace(/[A-Z]/g, (match) => {
                return `-${match.toLowerCase()}`;
            });
            path = `/pages/${name}/${name}`;
            // console.log(path)
          }
          else
          {
            path = `/pages/${name}/${name}`;
          }
            
        }
        wx.navigateTo({
            url: path,
            fail: () => {
                wx.navigateTo({
                    url: '/pages/home/navigateFail/navigateFail',
                });
            },
        });
      }
    },
    onShareAppMessage() {
        return {
            title: 'TDesign UI',
            path: '/pages/home/home',
        };
    },
    getQueryByUrl(url) {
        const data = {};
        const queryArr = `${url}`.match(/([^=&#?]+)=[^&#]+/g) || [];
        if (queryArr.length) {
            queryArr.forEach((para) => {
                const d = para.split('=');
                const val = decodeURIComponent(d[1]);
                if (data[d[0]] !== undefined) {
                    data[d[0]] += `,${val}`;
                }
                else {
                    data[d[0]] = val;
                }
            });
        }
        return data;
    },
    getSelectItem:function(e){
      console.log(e.detail)
      var that = this;
      var itemWidth = e.detail.scrollWidth / that.data.proList.length;//每个商品的宽度
      itemw = itemWidth
      var scrollLeft = e.detail.scrollLeft;//滚动宽度
      scroll_val = e.detail.scrollLeft;
      var curIndex = Math.round(scrollLeft / itemWidth);//通过Math.round方法对滚动大于一半的位置进行进位
      curridx = curIndex
      for (var i = 0, len = that.data.proList.length; i < len; ++i) {
          that.data.proList[i].selected = false;
      }
      that.data.proList[curIndex].selected = true;
      app.globalData.wardNum = curIndex 
      that.setData({
          proList: that.data.proList,
          giftNo: this.data.proList[curIndex].id
      });
      console.log(that.data.giftNo)
      console.log(app.globalData.wardNum)
  },
});
