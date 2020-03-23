//index.js
//获取应用实例
const app = getApp()
import { request } from "../../request/index.js"
Page({
  data: {
    list:[],
    total:'',
    page:1

  },
  handelPost(){
wx.navigateTo({
  url: '/pages/Postcompany/index',
})
  },
  // 调用封装的方法，获取轮播图数据
  async getSwiperdata(last_id) {
    // formdata.append("page", 1);
   
    const list = await request({

      url: '/job/get-job-record',
      method: 'post',
      data: {
        page:this.data.page,
        last_id
      }

    })
    // console.log(list)
    this.setData({
      total:list.data.data.count
    })
    if (this.data.list.length == 0) {
      this.data.list = list.data.data.res;
    } else {
      list.data.data.res.forEach(item => {
        this.data.list.push(item);
        
      });
    }
    this.setData({
      list: this.data.list
    })
  
    // console.log(this.data.list)
  }
  ,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.getSwiperdata();
  },
  //下拉刷新
  onPullDownRefresh(){
    this.setData({
      list:[]
    })
    this.getSwiperdata();
    wx.stopPullDownRefresh();
  },
  //页面上拉触底加载更多
  onReachBottom(){
    if (Math.ceil(this.data.total / 10) >= 1) {
      let last_id = this.data.list[this.data.list.length - 1].id;
      this.setData({
        page:this.data.page++
      })
      this.getSwiperdata(last_id);
      // this.loading = false;
    } else {
      // this.finished = true;
      cosole.log('没了')
    }
  }
})
